import { IsEnum } from 'class-validator';
import { StatusPagamento } from '../../common/enums/status-pagamento.enum';

export class UpdateStatusFinanceiroDto {
  @IsEnum(StatusPagamento)
  status: StatusPagamento;
}
