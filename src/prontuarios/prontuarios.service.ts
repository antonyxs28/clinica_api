import { Injectable, ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProntuarioDto } from './dto/create-prontuario.dto';

@Injectable()
export class ProntuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProntuarioDto: CreateProntuarioDto, user: any) {
    const paciente = await this.prisma.paciente.findUnique({ where: { id: createProntuarioDto.pacienteId } });
    if (!paciente || paciente.clinicaId !== user.clinicaId) {
      throw new ForbiddenException('Paciente inválido');
    }
    const existing = await this.prisma.prontuario.findUnique({ where: { pacienteId: createProntuarioDto.pacienteId } });
    if (existing) {
      throw new ConflictException('Prontuário já existe para esse paciente');
    }
    return this.prisma.prontuario.create({
      data: {
        descricao: createProntuarioDto.descricao,
        pacienteId: createProntuarioDto.pacienteId,
        clinicaId: user.clinicaId,
        clinicoId: user.papel === 'clinico' ? user.id : undefined,
      },
    });
  }

  async findByPacienteId(pacienteId: string, user: any) {
    const prontuario = await this.prisma.prontuario.findUnique({ where: { pacienteId } });
    if (!prontuario || prontuario.clinicaId !== user.clinicaId) {
      throw new NotFoundException('Prontuário não encontrado');
    }
    if (user.papel === 'paciente') {
      const paciente = await this.prisma.paciente.findUnique({ where: { id: pacienteId } });
      if (!paciente || paciente.email !== user.email) {
        throw new ForbiddenException('Acesso negado');
      }
    }
    if (user.papel === 'clinico' && prontuario.clinicoId !== user.id) {
      throw new ForbiddenException('Acesso negado');
    }
    return prontuario;
  }
}
