import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('productCategories')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_name: string;

  @Column({ nullable: true })
  parentCategory_id: number;

  // @ManyToOne(() => ProductEntity, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'parentCategory_id' })
  // products: ProductEntity[];

  @OneToMany(() => ProductEntity, (product) => product.category, {
    onDelete: 'CASCADE',
  },)
  products: ProductEntity[];
}
