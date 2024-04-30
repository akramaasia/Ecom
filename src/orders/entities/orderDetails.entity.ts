import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { OrdersEntity } from './order.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

@Entity('orderDetails')
export class OrderDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => OrdersEntity,
    (orders) => orders.id,
    {
      cascade: true
    }
  )
  @JoinColumn({name: 'order_id'})
  order: OrdersEntity[];

  @ManyToOne(
    () => ProductEntity,
    (product) => product.id,
    {
      cascade: true
    }
  )
  @JoinColumn({name: 'product_id'})
  product: ProductEntity[];

}