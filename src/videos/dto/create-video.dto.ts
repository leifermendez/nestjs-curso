import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateVideoDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(1,50)
  title: string;

  @ApiProperty()
  @IsNotEmpty()

  description: string;

  @ApiProperty()
  @IsNotEmpty()
  idCourse: string;
}
