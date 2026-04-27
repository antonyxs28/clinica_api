import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { User } from '../common/decorators/user.decorator';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @Roles('admin')
  create(@Body() createUsuarioDto: CreateUsuarioDto, @User() user: any) {
    return this.usuariosService.create(createUsuarioDto, user);
  }

  @Get()
  @Roles('admin')
  findAll(@User() user: any) {
    return this.usuariosService.findAll(user);
  }
}
