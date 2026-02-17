import { Injectable } from '@nestjs/common';
import { CreateUserdto } from './DTO';
import { InjectModel } from '@nestjs/mongoose';
import { users } from 'src/schemas/users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserExistsdto } from './DTO/UserExists.dto';
import { CreateWordpressdto } from './DTO/CreateWordpress.dto';
import { DelWordpressdto } from './DTO/DelWordpress.dto';
import { CreateWebsitedto } from './DTO/CreateWebsite.dto';
import { MysqlService } from 'src/mysql/mysql.service';
import * as fs from 'fs/promises';
import * as path from 'path';
import { access, mkdir, rm } from 'fs/promises';
import { createReadStream } from 'fs';
import * as unzipper from 'unzipper';
import { randomBytes } from 'crypto';
import { chmodRecursive } from 'src/util/recusivechmod';


@Injectable()
export class UserService {
    constructor(
        @InjectModel("user") private userModel: Model<users>,
        private readonly mysqlService: MysqlService
    ) { }

    async CreateUser(data: CreateUserdto) {
        const user = new this.userModel(data)
        user.save()
    }

    async UserExists(data: UserExistsdto) {
        const exists = (await this.userModel.find({ 'id': data.id })).length > 0
        return { data: exists }
    }

    async CreateWordpress(data: CreateWordpressdto) {
        const DB_PASSWORD = randomBytes(6).toString('hex');
        const id = `${data.username}/w_${data.subdomain}`;
        const db_name = `${data.username}_w_${data.subdomain}`;
        const user = await this.userModel.findOne({ id: data.id });

        if (user && user.wordpress.some(db => db.subdomain === id)) {
            console.log("Wordpress already exists for this user.");
            return;
        }

        const dirPath = path.join("/var/www/projects", data.username, `w_${data.subdomain}`);

        try {
            await fs.mkdir(dirPath, { recursive: true });
        } catch (err) {
            console.error("Failed to create directory:", err);
            return;
        }

        try {
            await this.mysqlService.createWPDB(db_name, DB_PASSWORD);

            await createReadStream('/templates/wordpress.zip')
                .pipe(unzipper.Extract({ path: dirPath }))
                .promise();

            const samplePath = path.join(dirPath, 'wp-config-sample.php');
            const targetPath = path.join(dirPath, 'wp-config.php');

            await fs.copyFile(samplePath, targetPath);

            let content = await fs.readFile(targetPath, 'utf8');

            content = content
                .replace(/define\(\s*'DB_NAME'\s*,\s*'.*?'\s*\);/, `define('DB_NAME', '${db_name}');`)
                .replace(/define\(\s*'DB_USER'\s*,\s*'.*?'\s*\);/, `define('DB_USER', '${db_name}');`)
                .replace(/define\(\s*'DB_PASSWORD'\s*,\s*'.*?'\s*\);/, `define('DB_PASSWORD', '${DB_PASSWORD}');`)
                .replace(/define\(\s*'DB_HOST'\s*,\s*'.*?'\s*\);/, `define('DB_HOST', 'mysql_db');`)
                .replace(/define\(\s*'WP_SITEURL'\s*,\s*'.*?'\s*\);/, `define('WP_SITEURL', '${process.env.AUTH_URL}/projects/${data.username}/${data.subdomain}');`)
                .replace(/define\(\s*'WP_HOME'\s*,\s*'.*?'\s*\);/, `define('WP_HOME', '${process.env.AUTH_URL}/projects/${data.username}/${data.subdomain}');`);

            await fs.writeFile(targetPath, content, 'utf8');
            await chmodRecursive(dirPath, 0o777);

        } catch (err) {
            console.error("Failed to setup Wordpress:", err);
            return;
        }

        await this.userModel.updateOne(
            { id: data.id },
            { $push: { wordpress: { subdomain: id, databaseName: db_name } } }
        );
    }

    async DelWordpress(data: DelWordpressdto) {
        const user = await this.userModel.findOne({ id: data.id });
        if (user && user.wordpress.some(db => db.subdomain === data.subdomain)) {


            const db_name = data.subdomain.replace(/\//g, "_")
            const dirPath = path.join("/var/www/projects", data.subdomain);

            await this.userModel.updateOne(
                { id: data.id },
                { $pull: { wordpress: { subdomain: data.subdomain } } }
            );
            try {
                await this.mysqlService.deleteWPDB(db_name);
                await fs.rm(dirPath, { recursive: true, force: true });
            } catch (error) {
                console.error('Error creating user or granting permissions:', error);
            }
        }
        return

    }

    async ShowWordpress(data: UserExistsdto) {
        const user = await this.userModel.findOne({ id: data.id })
        return user.wordpress;
    }

    async CreateWebsite(data: CreateWebsitedto) {
        const subdomain = `${data.username}/${data.subdomain}`
        const user = await this.userModel.findOne({ id: data.id });
        if (user && user.website.some(db => db.subdomain === subdomain)) {
            console.log("wordpress already exists for this user.");
            return;
        }

        const dirPath = path.join("/var/www/projects", data.username, data.subdomain);
        const cpyPath = path.join(dirPath, "index.html")
        await this.mysqlService.createFTPacces(subdomain.replace(/\//g, ''), data.pass, dirPath);
        try {
            await access(dirPath);
        } catch {
            await mkdir(dirPath, { recursive: true });
            await fs.copyFile("/templates/index.html", cpyPath);
        }

        await this.userModel.updateOne(
            { id: data.id },
            { $push: { website: { subdomain: subdomain, pass: data.pass } } }
        );
        return "ok"
    }

    async DelWebsite(data: DelWordpressdto) {
        const user = await this.userModel.findOne({ id: data.id });
        if (user && user.website.some(db => db.subdomain === data.subdomain)) {

            const dirPath = path.join("/var/www/projects", data.subdomain);

            await this.mysqlService.deleteFTPacces(data.subdomain.replace(/\//g, ''))

            try {
                await rm(dirPath, { recursive: true, force: true });
                await this.userModel.updateOne(
                    { id: data.id },
                    { $pull: { website: { subdomain: data.subdomain } } }
                );

                return { success: true, message: 'Website deleted successfully' };
            } catch (error) {
                console.error(`Deletion error: ${error}`);
                throw new Error(`Failed to delete website files: ${error}`);
            }
        }
    }

    async ShowWebsites(data: UserExistsdto) {
        const user = await this.userModel.findOne({ id: data.id })
        return user.website;
    }
}
