import { Injectable, ConflictException, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto, user: any) {
    const emailExists = await this.prisma.usuario.findUnique({ where: { email: createUsuarioDto.email } });
    if (emailExists) {
      throw new ConflictException('Email já está em uso');
    }
    const senhaHash = await bcrypt.hash(createUsuarioDto.senha, 10);
    return this.prisma.usuario.create({
      data: {
        nome: createUsuarioDto.nome,
        email: createUsuarioDto.email,
        senha: senhaHash,
        papel: createUsuarioDto.papel,
        clinicaId: user.clinicaId,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        papel: true,
        clinicaId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findAll(user: any) {
    if (!['admin', 'atendente', 'clinico'].includes(user.papel)) {
      throw new ForbiddenException('Acesso negado');
    }
    return this.prisma.usuario.findMany({
      where: { clinicaId: user.clinicaId },
      select: {
        id: true,
        nome: true,
        email: true,
        papel: true,
        clinicaId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
