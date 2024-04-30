import {
    BaseEntity,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  import { ProductEntity } from 'src/products/entities/product.entity';
import { OrdersEntity } from './order.entity';
  
  @Entity('orderproducts')
  export class CartDetailProductsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;
    @PrimaryColumn({ name: 'order_id' })
    orderId: number;
  
    @PrimaryColumn({ name: 'product_id' })
    courseId: number;
   
    @ManyToOne(() => OrdersEntity, (orders) => orders.products, {
      onDelete: 'CASCADE',
    })
    @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
    orders: OrdersEntity[];
  
    @ManyToOne(() => ProductEntity, (products) => products.cartDetails, {
      onDelete: 'CASCADE',
    })
    @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
    products: ProductEntity[];
  }
  