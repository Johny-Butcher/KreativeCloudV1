import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { DatabaseInfo, DatabaseInfoSchema } from "./database.schema";
@Schema()
export class mysql extends Document {
    @Prop()
    id: string
    @Prop()
    username: string
    @Prop()
    pass: string
    @Prop({ type: [DatabaseInfoSchema], default: [] })
    databases: DatabaseInfo[];

}

export const mysqlSchema = SchemaFactory.createForClass(mysql);
