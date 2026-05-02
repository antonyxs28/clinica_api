import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { User } from '../common/decorators/user.decorator';
import { ConvitesService } from './convites.service';
import { CreateConviteDto } from './dto/create-convite.dto';
import { AcceptConviteDto } from './dto/accept-convite.dto';

@Controller('convites')
export class ConvitesController {
  constructor(private readonly convitesService: ConvitesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'atendente')
  create(@Body() createConviteDto: CreateConviteDto, @User() user: any) {
    return this.convitesService.create(createConviteDto, user);
  }

  @Post('aceitar')
  accept(@Body() acceptConviteDto: AcceptConviteDto) {
    return this.convitesService.accept(acceptConviteDto);
  }
}
