import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClinicaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  endereco: string;
}
