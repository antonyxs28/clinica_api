import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { StatusPagamento } from '../../common/enums/status-pagamento.enum';
import { TipoFinanceiro } from '../../common/enums/tipo-financeiro.enum';

export class CreateFinanceiroDto {
  @IsNumber()
  @Min(0)
  valor: number;

  @IsEnum(TipoFinanceiro)
  tipo: TipoFinanceiro;

  @IsEnum(StatusPagamento)
  status: StatusPagamento;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsUUID()
  pacienteId: string;

  @IsOptional()
  @IsUUID()
  agendamentoId?: string;
}
