import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClinicaDto } from './dto/create-clinica.dto';

@Injectable()
export class ClinicasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClinicaDto: CreateClinicaDto) {
    const exists = await this.prisma.clinica.findUnique({ where: { cnpj: createClinicaDto.cnpj } });
    if (exists) {
      throw new ConflictException('CNPJ já cadastrado');
    }
    return this.prisma.clinica.create({ data: createClinicaDto });
  }

  findAll() {
    return this.prisma.clinica.findMany();
  }
}
