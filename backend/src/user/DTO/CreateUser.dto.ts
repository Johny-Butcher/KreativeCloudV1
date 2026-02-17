import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length, Max, MaxLength } from "class-validator";

export class CreateUserdto {
    @IsNotEmpty()
    @IsString()
    id: String

    @IsNotEmpty()
    @IsString()
    name: String

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: String

    @IsNotEmpty()
    @IsString()
    img: String


}