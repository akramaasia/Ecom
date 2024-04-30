import { EntityBase } from 'src/base/base.entity';
import { OrdersEntity } from 'src/orders/entities/order.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CartEntity } from 'src/user/entities/cart.entity';
@Entity('userAuthEcom')
export class UserEntity extends EntityBase {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @OneToMany(() => OrdersEntity, (order) => order.user)
  orders: OrdersEntity[];

  @OneToOne(() => CartEntity, (cart) => cart.user)
  cart: CartEntity;
}
