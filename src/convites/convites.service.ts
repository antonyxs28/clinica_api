import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateConviteDto } from './dto/create-convite.dto';
import { AcceptConviteDto } from './dto/accept-convite.dto';

@Injectable()
export class ConvitesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createConviteDto: CreateConviteDto, user: any) {
    const existing = await this.prisma.convite.findFirst({ where: { email: createConviteDto.email, clinicaId: user.clinicaId, status: 'pendente' } });
    if (existing) {
      throw new ConflictException('Convite pendente já existe para esse email');
    }
    return this.prisma.convite.create({
      data: {
        email: createConviteDto.email,
        codigo: createConviteDto.codigo,
        status: 'pendente',
        clinicaId: user.clinicaId,
      },
    });
  }

  async accept(acceptConviteDto: AcceptConviteDto) {
    const convite = await this.prisma.convite.findFirst({ where: { email: acceptConviteDto.email, codigo: acceptConviteDto.codigo, status: 'pendente' } });
    if (!convite) {
      throw new NotFoundException('Convite inválido ou expirado');
    }
    const userExists = await this.prisma.usuario.findUnique({ where: { email: acceptConviteDto.email } });
    if (userExists) {
      throw new ConflictException('Usuário já cadastrado');
    }
    const senhaHash = await bcrypt.hash(acceptConviteDto.senha, 10);
    await this.prisma.usuario.create({
      data: {
        nome: acceptConviteDto.nome,
        email: acceptConviteDto.email,
        senha: senhaHash,
        papel: acceptConviteDto.papel,
        clinicaId: convite.clinicaId,
      },
    });
    return this.prisma.convite.update({ where: { id: convite.id }, data: { status: 'aceito' } });
  }
}
