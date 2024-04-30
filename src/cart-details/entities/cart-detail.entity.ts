import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
    BaseEntity
  } from 'typeorm';
  import { ProductEntity } from 'src/products/entities/product.entity';
  import { CartEntity } from '../../user/entities/cart.entity';
import { EntityBase } from 'src/base/base.entity';


  @Entity('cartDetails')
  export class CartDetailEntity extends EntityBase{
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => CartEntity, (cart) => cart.id, {
      cascade: true,
    })
    @JoinColumn({ name: 'cart_id' })
    cart: CartEntity;

    @ManyToMany(() => ProductEntity, products => products.cartDetails)
    @JoinTable({
      name: 'cartdetailsproducts',
      joinColumn: {
        name: 'cartdetail_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'cartdetail_id_id',
      },
      inverseJoinColumn: {
        name: 'product_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'product_id_id',
      },
    })
    products: ProductEntity[];
    
  }
  