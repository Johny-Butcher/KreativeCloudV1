import { IsNotEmpty, IsString } from "class-validator";

export class ShowPassdto {
    @IsNotEmpty()
    @IsString()
    id: string
}