import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ClinicasService } from './clinicas.service';
import { CreateClinicaDto } from './dto/create-clinica.dto';

@Controller('clinicas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClinicasController {
  constructor(private readonly clinicasService: ClinicasService) {}

  @Post()
  @Roles('admin')
  create(@Body() createClinicaDto: CreateClinicaDto) {
    return this.clinicasService.create(createClinicaDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.clinicasService.findAll();
  }
}
