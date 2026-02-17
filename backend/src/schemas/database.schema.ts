import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DatabaseInfo {
    @Prop()
    databaseName: string;
}

export const DatabaseInfoSchema = SchemaFactory.createForClass(DatabaseInfo);
