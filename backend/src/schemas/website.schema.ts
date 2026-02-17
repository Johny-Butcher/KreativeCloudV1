import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class WebsiteInfo {

    @Prop()
    subdomain: string;
    @Prop()
    pass: string;
}

export const WebsiteInfoSchema = SchemaFactory.createForClass(WebsiteInfo);
