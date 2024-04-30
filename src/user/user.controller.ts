import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { CartRepository } from './cart.repository';
import { CartEntity } from './entities/cart.entity';
// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  users: any;
  constructor(private readonly userRepository: UserRepository,
    private readonly cartRepository: CartRepository) {}

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findUserDetails(username);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);
    // console.log(user)
    // const cart= this.cartRepository.create()
    // user.cart=cart;
    return await this.userRepository.save(user);
  }
}