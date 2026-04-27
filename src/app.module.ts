import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ClinicasModule } from './clinicas/clinicas.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { AgendamentosModule } from './agendamentos/agendamentos.module';
import { FinanceiroModule } from './financeiro/financeiro.module';
import { ConvitesModule } from './convites/convites.module';
import { ProntuariosModule } from './prontuarios/prontuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.example'],
      expandVariables: true,
    }),
    ThrottlerModule.forRoot({ throttlers: [{ ttl: 60, limit: 20 }] }),
    PrismaModule,
    AuthModule,
    UsuariosModule,
    ClinicasModule,
    PacientesModule,
    AgendamentosModule,
    FinanceiroModule,
    ConvitesModule,
    ProntuariosModule,
  ],
})
export class AppModule {}
