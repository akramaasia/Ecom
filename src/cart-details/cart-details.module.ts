import { Module } from '@nestjs/common';
import { CartDetailsService } from './cart-details.service';
import { CartDetailsController } from './cart-details.controller';
import { CartDetailRepository } from './cart-details.repository';

@Module({
  controllers: [CartDetailsController],
  providers: [CartDetailsService, CartDetailRepository],
})
export class CartDetailsModule {}
