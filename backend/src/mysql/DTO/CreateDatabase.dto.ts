import { IsNotEmpty, IsString } from "class-validator";

export class CreateDatabasedto {
    @IsNotEmpty()
    @IsString()
    id: string

    @IsNotEmpty()
    @IsString()
    databaseName: string

    @IsNotEmpty()
    @IsString()
    username: string
}