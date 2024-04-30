
import { CartEntity } from './entities/cart.entity';
import { DataSource, EntityRepository, Repository } from 'typeorm';
import {  Injectable } from '@nestjs/common';
@Injectable()

export class CartRepository extends Repository<CartEntity> {
  
   
}