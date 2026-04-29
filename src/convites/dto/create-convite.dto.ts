import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateConviteDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;
}
