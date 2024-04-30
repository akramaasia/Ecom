import { ConflictException, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { CartRepository } from './cart.repository';
import { CartEntity } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
export type User = any;

@Injectable()
export class UsersService {
  users: any;
  constructor(private readonly userRepository: UserRepository,
   @InjectRepository(CartEntity)
    private readonly cartRepository:Repository<CartEntity>) {}

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findUserDetails(username);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);
    const cart= new CartEntity();
    //console.log(cart)
    //const cart= this.cartRepository.create();
    await this.cartRepository.save(cart);
    user.cart=cart;
    //console.log(user);
    return await this.userRepository.save(user);
  }
}