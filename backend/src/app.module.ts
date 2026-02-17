import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MysqlModule } from './mysql/mysql.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    MysqlModule
  ],
})
export class AppModule { }
