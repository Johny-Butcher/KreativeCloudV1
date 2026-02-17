import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { WordpressInfo, WordpressInfoSchema } from "./wordpress.schema";
import { WebsiteInfo, WebsiteInfoSchema } from "./website.schema";
@Schema()
export class users extends Document {
    @Prop()
    id: string
    @Prop()
    name: string
    @Prop()
    email: string
    @Prop()
    img: string
    @Prop({ type: [WordpressInfoSchema], default: [] })
    wordpress: WordpressInfo[];
    @Prop({ type: [WebsiteInfoSchema], default: [] })
    website: WebsiteInfo[];
}

export const usersSchema = SchemaFactory.createForClass(users);
