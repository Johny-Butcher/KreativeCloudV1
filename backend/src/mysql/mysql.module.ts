import { Module } from '@nestjs/common';
import { MysqlService } from './mysql.service';
import { MysqlController } from './mysql.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { mysqlSchema } from 'src/schemas/mysql.schema';

@Module({
  providers: [MysqlService],
  controllers: [MysqlController],
  imports: [MongooseModule.forFeature([{ name: "mysql", schema: mysqlSchema }])],
  exports: [MysqlService]
})
export class MysqlModule { }
