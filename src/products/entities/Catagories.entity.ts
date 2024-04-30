import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('productCategories')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_name: string;

  @Column({ nullable: true })
  parentCategory_id: number;

  @ManyToOne(() => CategoryEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parentCategory_id' })
  parentCategory: CategoryEntity;
}
