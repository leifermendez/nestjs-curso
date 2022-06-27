import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsUrl, Max, Min } from "class-validator";

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
    @IsUrl()
    cover:string;
}
