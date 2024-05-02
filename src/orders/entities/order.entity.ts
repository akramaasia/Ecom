import { OutletEntity } from 'src/outlet/entities/outlet.entity';
import { OrderDetailEntity } from './orderDetails.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    ManyToMany,
    JoinTable
  } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { EntityBase } from 'src/base/base.entity';
  
@Entity('orders')

export class OrdersEntity extends EntityBase{
    @PrimaryGeneratedColumn()
    id: number;


    // @ManyToOne(
    //     () => OutletEntity,
    //     (outlet) => outlet.orders,
    //     {
    //       cascade: true,
    //     },
    //   )
      // @JoinColumn({ name: 'outlet_id' })
      // outlet: OutletEntity[];
    
    
      @OneToMany(() => OrderDetailEntity, (orderDetails) => orderDetails.order)
      orderDetails: OrderDetailEntity[];

      @Column({
        name: 'user_id',
        nullable: false,
      })
      userId: number;

      
      @ManyToOne(
        () => UserEntity,
        (user) => user.orders,
        {
          cascade: true,
        },
      )
      @JoinColumn({
        name: 'user_id',
      })
       user: UserEntity;
      

      //  @OneToMany(() => TransactionEntity, transaction => transaction.order)
      //  transactions: TransactionEntity[];
       
       @ManyToMany(() => ProductEntity, products => products.orders)
       @JoinTable({
         name: 'orderproducts',
         joinColumn: {
           name: 'order_id',
           referencedColumnName: 'id',
           foreignKeyConstraintName: 'orderid_id',
         },
         inverseJoinColumn: {
           name: 'product_id',
           referencedColumnName: 'id',
           foreignKeyConstraintName: 'product_id_id',
         },
       })
       products: ProductEntity[];
       
}
