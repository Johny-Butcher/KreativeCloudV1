import { Controller, Post, Body } from '@nestjs/common';
import { MysqlService } from './mysql.service';
import { ChangePassdto, CreateDatabasedto, CreateUserdto, ShowPassdto } from './DTO';
import { ShowDatabasesdto } from './DTO/ShowDatabases.dto';

@Controller('mysql')
export class MysqlController {
    constructor(private readonly mysqlService: MysqlService) { }

    @Post('createUser')
    async createUser(@Body() data: CreateUserdto) {
        await this.mysqlService.createUserWithDbPermissions(data);
        return { message: 'User created and permissions granted' };
    }

    @Post('createDatabase')
    async createDatabase(@Body() data: CreateDatabasedto) {
        await this.mysqlService.createDatabase(data);
        return { message: "bla bla" };
    }

    @Post('deleteDatabase')
    async deleteDatabase(@Body() data: CreateDatabasedto) {
        await this.mysqlService.DelDB(data)
        return { message: "deleted" }
    }

    @Post('showPass')
    async showPass(@Body() data: ShowPassdto) {
        const pass = await this.mysqlService.ShowPass(data)
        return pass;
    }

    @Post('changePass')
    async changePass(@Body() data: ChangePassdto) {
        await this.mysqlService.ChangePass(data)
        return { message: "ok" }
    }

    @Post('showDatabases')
    async showDatabases(@Body() data: ShowPassdto) {
        const res = await this.mysqlService.ShowDatabases(data)
        return res;

    }

    @Post('userExists')
    async userExists(@Body() data: ShowDatabasesdto) {
        const res = await this.mysqlService.UserExists(data)
        return res;
    }
}