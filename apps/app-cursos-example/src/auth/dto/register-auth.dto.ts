import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @IsEmail()
  email: string;

  @MinLength(3)
  @MaxLength(20)
  name: string;

  @MinLength(6)
  @MaxLength(20)
  password: string;
}
