import { Controller, Post, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { User } from '../common/decorators/user.decorator';
import { FinanceiroService } from './financeiro.service';
import { CreateFinanceiroDto } from './dto/create-financeiro.dto';
import { UpdateStatusFinanceiroDto } from './dto/update-status-financeiro.dto';

@Controller('financeiro')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'clinico', 'atendente', 'paciente')
export class FinanceiroController {
  constructor(private readonly financeiroService: FinanceiroService) {}

  @Post()
  create(@Body() createFinanceiroDto: CreateFinanceiroDto, @User() user: any) {
    return this.financeiroService.create(createFinanceiroDto, user);
  }

  @Get()
  findAll(@User() user: any) {
    return this.financeiroService.findAll(user);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusFinanceiroDto, @User() user: any) {
    return this.financeiroService.updateStatus(id, updateStatusDto, user);
  }
}
