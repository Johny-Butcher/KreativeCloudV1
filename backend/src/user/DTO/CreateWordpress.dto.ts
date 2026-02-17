import { IsNotEmpty, IsString } from "class-validator"

export class CreateWordpressdto {
    @IsNotEmpty()
    @IsString()
    id: string

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    subdomain: string
}