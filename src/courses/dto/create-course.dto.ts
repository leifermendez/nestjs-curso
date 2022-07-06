import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsUrl, IsUUID, Max, Min } from "class-validator";

export class CreateCourseDto {
    @ApiProperty()
    @IsNotEmpty()
    title:string

    @ApiProperty()
    @IsNotEmpty()
    price:number;

    @ApiProperty()
    @IsNotEmpty()
    description:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    idAuthor:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
    cover:string;
}
