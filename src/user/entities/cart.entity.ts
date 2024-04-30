import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CartDetailEntity } from 'src/cart-details/entities/cart-detail.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  
  @OneToMany(() => CartDetailEntity, (cartDetails) => cartDetails.cart)
  cartDetails: CartDetailEntity[];

  @OneToOne(() => UserEntity, (user) => user.cart, {
    cascade: true,
  })
  @JoinColumn() 
  user: UserEntity;
}
