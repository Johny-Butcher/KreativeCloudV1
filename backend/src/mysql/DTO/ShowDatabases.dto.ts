import { IsNotEmpty, IsString } from "class-validator";

export class ShowDatabasesdto {
    @IsNotEmpty()
    @IsString()
    id: string
}