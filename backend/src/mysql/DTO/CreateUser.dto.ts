import { IsNotEmpty, IsString } from "class-validator"

export class CreateUserdto {
    @IsNotEmpty()
    @IsString()
    id: string
    @IsNotEmpty()
    @IsString()
    username: string
    @IsNotEmpty()
    @IsString()
    pass: string
}