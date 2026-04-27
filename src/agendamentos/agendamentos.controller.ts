import { Controller, Post, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { User } from '../common/decorators/user.decorator';
import { AgendamentosService } from './agendamentos.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateStatusAgendamentoDto } from './dto/update-status-agendamento.dto';

@Controller('agendamentos')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'clinico', 'atendente', 'paciente')
export class AgendamentosController {
  constructor(private readonly agendamentosService: AgendamentosService) {}

  @Post()
  create(@Body() createAgendamentoDto: CreateAgendamentoDto, @User() user: any) {
    return this.agendamentosService.create(createAgendamentoDto, user);
  }

  @Get()
  findAll(@User() user: any) {
    return this.agendamentosService.findAll(user);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusAgendamentoDto, @User() user: any) {
    return this.agendamentosService.updateStatus(id, updateStatusDto, user);
  }
}
