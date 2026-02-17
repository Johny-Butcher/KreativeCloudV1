import { IsNotEmpty, IsString } from "class-validator"

export class CreateWebsitedto {
    @IsNotEmpty()
    @IsString()
    id: string

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    subdomain: string

    @IsNotEmpty()
    @IsString()
    pass: string
}