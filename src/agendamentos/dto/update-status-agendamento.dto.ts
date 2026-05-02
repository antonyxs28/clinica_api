import { IsEnum } from 'class-validator';
import { StatusAgendamento } from '../../common/enums/status-agendamento.enum';

export class UpdateStatusAgendamentoDto {
  @IsEnum(StatusAgendamento)
  status: StatusAgendamento;
}
