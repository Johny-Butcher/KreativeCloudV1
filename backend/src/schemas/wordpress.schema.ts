import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class WordpressInfo {

    @Prop()
    subdomain: string;
    @Prop()
    databaseName: string;
}

export const WordpressInfoSchema = SchemaFactory.createForClass(WordpressInfo);
