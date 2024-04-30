import { EntityBase } from 'src/base/base.entity';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany,ManyToMany } from 'typeorm';
import { CategoryEntity } from './Catagories.entity';
import { OutletEntity } from 'src/outlet/entities/outlet.entity';
import { OrderDetailEntity } from 'src/orders/entities/orderDetails.entity';
import { CartDetailEntity } from 'src/cart-details/entities/cart-detail.entity';
import { IsOptional } from 'class-validator';
import { OrdersEntity } from 'src/orders/entities/order.entity';

@Entity('products')
export class ProductEntity extends EntityBase {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @ManyToOne(() => CategoryEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @ManyToOne(() => OutletEntity, (outlet) => outlet.productItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'outlet_id' })
  outlet: ProductEntity;

@OneToMany(()=> OrderDetailEntity , (orderDetails) => orderDetails.product)
orderDetails: OrderDetailEntity[];

@Column({name :'cartDetails_id', nullable :true})
cartDetailsId: number


@ManyToMany(() => CartDetailEntity, cartDetail => cartDetail.products)
cartDetails: CartDetailEntity[];


@ManyToMany(() => OrdersEntity, order => order.products)
orders: OrdersEntity[];

}
