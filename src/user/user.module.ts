import { Module } from '@nestjs/common';
import { UsersService } from './user.service';

import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CartRepository } from './cart.repository';
import { CartEntity } from './entities/cart.entity';

@Module({
 
  imports: [TypeOrmModule.forFeature([UserEntity, CartEntity])],
  providers: [UsersService, UserRepository, CartRepository],
  exports: [UsersService],
})
export class UserModule {}
