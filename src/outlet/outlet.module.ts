import { Module } from '@nestjs/common';
import { OutletService } from './outlet.service';
import { OutletController } from './outlet.controller';
import { OutletRepository } from './outlet.repository';

@Module({
  controllers: [OutletController],
  providers: [OutletService, OutletRepository],
})
export class OutletModule {}
