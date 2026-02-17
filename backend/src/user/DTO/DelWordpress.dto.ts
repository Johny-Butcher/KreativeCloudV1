import { IsNotEmpty, IsString } from "class-validator";

export class DelWordpressdto {
    @IsNotEmpty()
    @IsString()
    id: string

    @IsNotEmpty()
    @IsString()
    subdomain: string
}