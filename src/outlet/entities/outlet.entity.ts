import { EntityBase } from 'src/base/base.entity';
import { OrdersEntity } from 'src/orders/entities/order.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity('outlet')
export class OutletEntity extends EntityBase {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  contact: string;

  @OneToMany(() => ProductEntity, (productItems) => productItems.outlet)
  productItems: ProductEntity[];

  // @OneToMany (() => OrdersEntity, (orders) => orders.outlet)
  // orders: OrdersEntity[];
}
