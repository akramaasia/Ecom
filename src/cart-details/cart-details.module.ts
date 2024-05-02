import { Module } from '@nestjs/common';
import { CartDetailsService } from './cart-details.service';
import { CartDetailsController } from './cart-details.controller';
import { CartDetailRepository } from './cart-details.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartRepository } from 'src/user/cart.repository';
import { CartEntity } from 'src/user/entities/cart.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/authguard/jwt.strategy';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CartRepository, CartEntity]),AuthModule],
  controllers: [CartDetailsController],
  providers: [CartDetailsService, CartDetailRepository,JwtStrategy,AuthService,JwtService, UsersService, UserRepository],
})
export class CartDetailsModule {}
