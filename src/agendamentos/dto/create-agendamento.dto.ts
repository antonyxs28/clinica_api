import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { StatusAgendamento } from '../../common/enums/status-agendamento.enum';

export class CreateAgendamentoDto {
  @IsUUID()
  pacienteId: string;

  @IsNotEmpty()
  @IsString()
  data: string;

  @IsEnum(StatusAgendamento)
  @IsOptional()
  status?: StatusAgendamento;

  @IsOptional()
  @IsString()
  descricao?: string;
}
