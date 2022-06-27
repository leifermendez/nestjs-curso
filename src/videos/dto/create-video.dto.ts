import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateVideoDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(1,50)
  title: string;

  
  @IsNotEmpty()
  @Length(1,50)
  description: string;

  @IsUrl()
  src: string;
}
