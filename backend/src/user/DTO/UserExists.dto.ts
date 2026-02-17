import { IsNotEmpty, IsString } from "class-validator";

export class UserExistsdto {
    @IsNotEmpty()
    @IsString()
    id: String
}