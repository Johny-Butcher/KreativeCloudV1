import { Injectable } from '@nestjs/common';
import { createConnection } from 'mysql2/promise';
import { InjectModel } from '@nestjs/mongoose';
import { mysql } from 'src/schemas/mysql.schema';
import { Model } from 'mongoose';
import { ChangePassdto, CreateDatabasedto, CreateUserdto, ShowPassdto } from './DTO';
import { ShowDatabasesdto } from './DTO/ShowDatabases.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MysqlService {
    constructor(@InjectModel("mysql") private mysqlModel: Model<mysql>) { }
    private async getConnection() {
        return await createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASS,
            database: 'cloud_platform',
        });
    }

    public async createFTPacces(project: string, password: string, dir: string) {
        const connection = await this.getConnection();
        const pass = await bcrypt.hash(password, 10);
        try {
            await connection.query("INSERT INTO `User` (`username`, `password`, `directory`) VALUES (?, ?, ?)", [project, pass, dir]);
        } catch (error) {
            console.error('Error creating user or granting permissions:', error);
            throw error;
        } finally {
            await connection.end();
        }

    }

    public async createWPDB(db: string, password: string) {
        const connection = await this.getConnection();
        try {
            await connection.query(`CREATE USER ?@'%' IDENTIFIED WITH mysql_native_password BY ?`, [db, password]);
            await connection.query(`CREATE DATABASE IF NOT EXISTS ??`, [db]);
            await connection.query(`GRANT ALL PRIVILEGES ON ??.* TO ?@'%'`, [db, db]);
            await connection.query(`FLUSH PRIVILEGES`);
        } catch (error) {
            console.error('Error creating user or granting permissions:', error);
            throw error;
        } finally {
            await connection.end();
        }
    }

    public async deleteWPDB(db: string) {
        const connection = await this.getConnection();
        try {
            await connection.query(`DROP DATABASE IF EXISTS ??`, [db]);
            await connection.query(`DROP USER IF EXISTS ?@'%'`, [db]);
        } catch (error) {
            console.error('Error creating user or granting permissions:', error);
            throw error;
        } finally {
            await connection.end();
        }
    }

    public async deleteFTPacces(project: string) {
        const connection = await this.getConnection();
        try {
            await connection.query("DELETE FROM `User` WHERE `username` = ?", [project]);
        } catch (error) {
            console.error('Error deleting FTP access:', error);
            throw error;
        } finally {
            await connection.end();
        }
    }

    public async createUserWithDbPermissions(data: CreateUserdto): Promise<void> {
        const connection = await this.getConnection();
        try {

            // Step 1: Drop the user if it already exists
            await connection.query(`DROP USER IF EXISTS ?@'%'`, [data.username]);

            // Step 2: Create the user
            await connection.query(`CREATE USER ?@'%' IDENTIFIED WITH mysql_native_password BY ?`, [data.username, data.pass]);

            // Step 3: Grant usage with specific limits
            //await connection.query(`GRANT USAGE ON *.* TO ?@'%' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0`, [data.username]);

            // Step 4: Create the database if it doesn't exist
            await connection.query(`CREATE DATABASE IF NOT EXISTS ??`, [data.username]);

            // Step 5: Grant all privileges on the new database to the user
            await connection.query(`GRANT ALL PRIVILEGES ON ??.* TO ?@'%'`, [data.username, data.username]);

            /* // Step 6: Grant privileges on databases with the specific prefix
            const dbPattern = `${data.username}\_%`;
            await connection.query("GRANT ALL PRIVILEGES ON ?.* TO ?@'%'", [dbPattern, data.username]);
 */
            // Step 7: Apply the changes
            await connection.query(`FLUSH PRIVILEGES`);
        } catch (error) {
            console.error('Error creating user or granting permissions:', error);
            throw error;
        } finally {
            await connection.end();
        }

        const mysql = new this.mysqlModel(data);
        mysql.databases.push({ databaseName: data.username })
        mysql.save();
    }

    public async createDatabase(data: CreateDatabasedto) {
        const connection = await this.getConnection();

        const user = await this.mysqlModel.findOne({ id: data.id });
        if (user && user.databases.some(db => db.databaseName === data.databaseName)) {
            console.log("Database already exists for this user.");
            return; // Exit the function early if the database already exists
        }
        //const dbName = `${data.username}_${data.databaseName}`;
        try {

            // Step 4: Create the database if it doesn't exist
            await connection.query(`CREATE DATABASE IF NOT EXISTS ??`, [data.databaseName]);

            // Step 5: Grant all privileges on the new database to the user
            await connection.query(`GRANT ALL PRIVILEGES ON ??.* TO ?@'%'`, [data.databaseName, data.username]);

            /* // Step 6: Grant privileges on databases with the specific prefix
            const dbPattern = `${data.username}\_%`;
            await connection.query("GRANT ALL PRIVILEGES ON ?.* TO ?@'%'", [dbPattern, data.username]);
 */
            // Step 7: Apply the changes
            await connection.query(`FLUSH PRIVILEGES`);
        } catch (error) {
            console.error('Error creating user or granting permissions:', error);
            throw error;
        } finally {
            await connection.end();
        }

        await this.mysqlModel.updateOne(
            { id: data.id },
            { $push: { databases: { databaseName: data.databaseName } } }
        );
    }

    public async ShowPass(data: ShowPassdto) {
        const user = await this.mysqlModel.findOne({ 'id': data.id })
        if (user == null) {
            return { data: "error" }
        }
        return user;
    }

    public async ChangePass(data: ChangePassdto) {
        const connection = await this.getConnection();
        try {
            await connection.query(`ALTER USER ?@'%' IDENTIFIED BY ?`, [data.username, data.newPass])
        } catch (error) {
            console.error('Error creating user or granting permissions:', error);
            throw error;
        } finally {
            await connection.end();
        }
        await this.mysqlModel.updateOne({ id: data.id }, { pass: data.newPass })
    }

    public async DelDB(data: CreateDatabasedto) {
        const connection = await this.getConnection();
        try {
            await connection.query('DROP DATABASE ??', [data.databaseName])
        } catch (error) {
            console.error('Error creating user or granting permissions:', error);
            throw error;
        } finally {
            await connection.end();
        }
        await this.mysqlModel.updateOne(
            { id: data.id },
            { $pull: { databases: { databaseName: data.databaseName } } }
        )
    }

    public async ShowDatabases(data: ShowDatabasesdto) {
        const mysql = await this.mysqlModel.findOne({ id: data.id })
        return mysql.databases;
    }

    public async UserExists(data: ShowDatabasesdto) {
        const mysql = ((await this.mysqlModel.find({ id: data.id })).length > 0)
        return { data: mysql };
    }

}