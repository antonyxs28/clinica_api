import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { User } from '../common/decorators/user.decorator';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';

@Controller('pacientes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'clinico', 'atendente', 'paciente')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto, @User() user: any) {
    return this.pacientesService.create(createPacienteDto, user);
  }

  @Get()
  findAll(@User() user: any) {
    return this.pacientesService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: any) {
    return this.pacientesService.findOne(id, user);
  }
}
