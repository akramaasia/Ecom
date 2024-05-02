import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartRepository } from 'src/user/cart.repository';
import { CartEntity } from 'src/user/entities/cart.entity';
import { CartDetailEntity } from 'src/cart-details/entities/cart-detail.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/authguard/jwt.strategy';
import { AuthGuard } from 'src/authguard/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ CartRepository, CartEntity, CartDetailEntity]),AuthModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository, JwtStrategy,AuthService,JwtService, UsersService, UserRepository],
})
export class OrdersModule {}
