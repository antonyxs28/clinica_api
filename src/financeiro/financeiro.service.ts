import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFinanceiroDto } from './dto/create-financeiro.dto';
import { UpdateStatusFinanceiroDto } from './dto/update-status-financeiro.dto';

@Injectable()
export class FinanceiroService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFinanceiroDto: CreateFinanceiroDto, user: any) {
    const paciente = await this.prisma.paciente.findUnique({ where: { id: createFinanceiroDto.pacienteId } });
    if (!paciente || paciente.clinicaId !== user.clinicaId) {
      throw new ForbiddenException('Paciente inválido');
    }
    if (createFinanceiroDto.agendamentoId) {
      const agendamento = await this.prisma.agendamento.findUnique({ where: { id: createFinanceiroDto.agendamentoId } });
      if (!agendamento || agendamento.clinicaId !== user.clinicaId) {
        throw new ForbiddenException('Agendamento inválido');
      }
    }
    return this.prisma.financeiro.create({
      data: {
        valor: createFinanceiroDto.valor,
        tipo: createFinanceiroDto.tipo,
        status: createFinanceiroDto.status,
        descricao: createFinanceiroDto.descricao,
        clinicaId: user.clinicaId,
        pacienteId: createFinanceiroDto.pacienteId,
        agendamentoId: createFinanceiroDto.agendamentoId,
      },
    });
  }

  async findAll(user: any) {
    const where: any = { clinicaId: user.clinicaId };
    if (user.papel === 'clinico') {
      where.paciente = { clinicoId: user.id };
    }
    if (user.papel === 'paciente') {
      where.paciente = { email: user.email };
    }
    return this.prisma.financeiro.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  async updateStatus(id: string, updateStatusDto: UpdateStatusFinanceiroDto, user: any) {
    const registro = await this.prisma.financeiro.findUnique({ where: { id }, include: { paciente: true } });
    if (!registro || registro.clinicaId !== user.clinicaId) {
      throw new NotFoundException('Registro financeiro não encontrado');
    }
    if (user.papel === 'paciente' && registro.paciente.email !== user.email) {
      throw new ForbiddenException('Acesso negado');
    }
    return this.prisma.financeiro.update({ where: { id }, data: { status: updateStatusDto.status } });
  }
}
