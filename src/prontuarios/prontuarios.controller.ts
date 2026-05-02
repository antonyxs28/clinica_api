import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { User } from '../common/decorators/user.decorator';
import { ProntuariosService } from './prontuarios.service';
import { CreateProntuarioDto } from './dto/create-prontuario.dto';

@Controller('prontuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'clinico', 'paciente')
export class ProntuariosController {
  constructor(private readonly prontuariosService: ProntuariosService) {}

  @Post()
  create(@Body() createProntuarioDto: CreateProntuarioDto, @User() user: any) {
    return this.prontuariosService.create(createProntuarioDto, user);
  }

  @Get(':pacienteId')
  findByPacienteId(@Param('pacienteId') pacienteId: string, @User() user: any) {
    return this.prontuariosService.findByPacienteId(pacienteId, user);
  }
}
