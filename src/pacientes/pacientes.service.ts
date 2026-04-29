import { Injectable, ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';

@Injectable()
export class PacientesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPacienteDto: CreatePacienteDto, user: any) {
    const exists = await this.prisma.paciente.findUnique({ where: { email: createPacienteDto.email } });
    if (exists) {
      throw new ConflictException('Paciente já cadastrado');
    }
    const data: any = {
      nome: createPacienteDto.nome,
      email: createPacienteDto.email,
      telefone: createPacienteDto.telefone,
      dataNascimento: createPacienteDto.dataNascimento,
      clinicaId: user.clinicaId,
    };
    if (user.papel === 'clinico') {
      data.clinicoId = user.id;
    }
    return this.prisma.paciente.create({ data });
  }

  async findAll(user: any) {
    const filters: any = { clinicaId: user.clinicaId };
    if (user.papel === 'clinico') {
      filters.clinicoId = user.id;
    }
    if (user.papel === 'paciente') {
      filters.email = user.email;
    }
    return this.prisma.paciente.findMany({ where: filters });
  }

  async findOne(id: string, user: any) {
    const paciente = await this.prisma.paciente.findUnique({ where: { id } });
    if (!paciente || paciente.clinicaId !== user.clinicaId) {
      throw new NotFoundException('Paciente não encontrado');
    }
    if (user.papel === 'paciente' && paciente.email !== user.email) {
      throw new ForbiddenException('Acesso negado');
    }
    if (user.papel === 'clinico' && paciente.clinicoId !== user.id) {
      throw new ForbiddenException('Acesso negado');
    }
    return paciente;
  }
}
