import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OrdersEntity } from './order.entity';
@Entity('transaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  // @ManyToOne(() => OrdersEntity, order => order.transactions)
  // order: OrdersEntity;
}