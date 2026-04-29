import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateStatusAgendamentoDto } from './dto/update-status-agendamento.dto';

@Injectable()
export class AgendamentosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAgendamentoDto: CreateAgendamentoDto, user: any) {
    const paciente = await this.prisma.paciente.findUnique({ where: { id: createAgendamentoDto.pacienteId } });
    if (!paciente || paciente.clinicaId !== user.clinicaId) {
      throw new ForbiddenException('Paciente não pertence à clínica');
    }
    return this.prisma.agendamento.create({
      data: {
        data: new Date(createAgendamentoDto.data),
        status: createAgendamentoDto.status,
        descricao: createAgendamentoDto.descricao,
        pacienteId: createAgendamentoDto.pacienteId,
        clinicaId: user.clinicaId,
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
    return this.prisma.agendamento.findMany({ where, orderBy: { data: 'desc' } });
  }

  async updateStatus(id: string, updateStatusDto: UpdateStatusAgendamentoDto, user: any) {
    const agendamento = await this.prisma.agendamento.findUnique({ where: { id }, include: { paciente: true } });
    if (!agendamento || agendamento.clinicaId !== user.clinicaId) {
      throw new NotFoundException('Agendamento não encontrado');
    }
    if (user.papel === 'clinico' && agendamento.paciente.clinicoId !== user.id) {
      throw new ForbiddenException('Acesso negado');
    }
    if (user.papel === 'paciente' && agendamento.paciente.email !== user.email) {
      throw new ForbiddenException('Acesso negado');
    }
    return this.prisma.agendamento.update({ where: { id }, data: { status: updateStatusDto.status } });
  }
}
