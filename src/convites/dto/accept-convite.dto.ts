import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { PapelUsuario } from '../../common/enums/papel-usuario.enum';

export class AcceptConviteDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  senha: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsEnum(PapelUsuario)
  papel: PapelUsuario;
}
