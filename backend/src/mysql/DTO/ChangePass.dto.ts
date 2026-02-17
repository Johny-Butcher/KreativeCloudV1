import { IsNotEmpty, IsString } from "class-validator";

export class ChangePassdto {
    @IsNotEmpty()
    @IsString()
    id: string

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    newPass: string
}