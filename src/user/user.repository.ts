import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CartEntity } from './entities/cart.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
    }
   
  
  async findUserDetails(username: string): Promise<UserEntity | undefined> {
    return this.findOneBy({ username });
  } 

  async createUser(user: UserEntity, cart : CartEntity): Promise<UserEntity> {
    try {
      //const userData=this.create(user)
      return await this.save(user);

    } catch (error) {
      if (error.code === '23505' && error.detail.includes('already exists')) {
        throw new ConflictException(
          'Username already exists.',
          'CustomErrorCode',
        ); // Pass the custom error message and code
      }
      throw error;
    }
  }
}