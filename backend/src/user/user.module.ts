import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { users, usersSchema } from 'src/schemas/users.schema';
import { MysqlService } from 'src/mysql/mysql.service';
import { mysqlSchema } from 'src/schemas/mysql.schema';

@Module({
  providers: [UserService, MysqlService],
  controllers: [UserController],
  imports: [MongooseModule.forFeature([{ name: "user", schema: usersSchema }]), MongooseModule.forFeature([{ name: "mysql", schema: mysqlSchema }])]
})
export class UserModule { }
