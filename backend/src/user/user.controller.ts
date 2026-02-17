import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserdto } from './DTO';
import { UserExistsdto } from './DTO/UserExists.dto';
import { CreateWordpressdto } from './DTO/CreateWordpress.dto';
import { DelWordpressdto } from './DTO/DelWordpress.dto';
import { CreateWebsitedto } from './DTO/CreateWebsite.dto';


@Controller('user')
export class UserController {
    constructor(private UserService: UserService) { }

    @Post("exists")
    UserExists(@Body() data: UserExistsdto) {
        return this.UserService.UserExists(data);
    }

    @Post("create")
    CreateUser(@Body() data: CreateUserdto) {
        this.UserService.CreateUser(data);
    }

    @Post("wordpressCreate")
    CreateWordpress(@Body() data: CreateWordpressdto) {
        console.log("wordpress controller")
        return this.UserService.CreateWordpress(data)
    }

    @Post("wordpressDel")
    DelWordpress(@Body() data: DelWordpressdto) {
        return this.UserService.DelWordpress(data)
    }

    @Post('showWordpress')
    async showDatabases(@Body() data: UserExistsdto) {
        const res = await this.UserService.ShowWordpress(data)
        return res;

    }

    @Post("websiteCreate")
    async CreateWebsite(@Body() data: CreateWebsitedto) {
        const res = await this.UserService.CreateWebsite(data)
        return res;
    }

    @Post("websiteDel")
    DelWebsite(@Body() data: DelWordpressdto) {
        return this.UserService.DelWebsite(data)
    }

    @Post('showWebsites')
    async showWebsites(@Body() data: UserExistsdto) {
        const res = await this.UserService.ShowWebsites(data)
        return res;
    }
}

