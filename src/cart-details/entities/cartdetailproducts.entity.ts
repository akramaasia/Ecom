import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartDetailEntity } from './cart-detail.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

@Entity('cartdetailsproducts')
export class CartDetailProductsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;
  @PrimaryColumn({ name: 'cartdetail_id' })
  cartDetailId: number;

  @PrimaryColumn({ name: 'product_id' })
  productId: number;
 
  @ManyToOne(() => CartDetailEntity, (cartDeatils) => cartDeatils.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'cartdetail_id', referencedColumnName: 'id' }])
  cartDetails: CartDetailEntity[];

  @ManyToOne(() => ProductEntity, (products) => products.cartDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  products: ProductEntity[];
}
