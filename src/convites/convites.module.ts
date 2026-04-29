import { Module } from '@nestjs/common';
import { ConvitesService } from './convites.service';
import { ConvitesController } from './convites.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ConvitesController],
  providers: [ConvitesService],
})
export class ConvitesModule {}
