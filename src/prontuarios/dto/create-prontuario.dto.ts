import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateProntuarioDto {
  @IsUUID()
  pacienteId: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;
}
