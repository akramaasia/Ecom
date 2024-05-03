import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './orders.repository';
import { Repository } from 'typeorm';
import { CartEntity } from 'src/user/entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CartDetailEntity } from 'src/cart-details/entities/cart-detail.entity';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,

    @InjectRepository(CartDetailEntity)
    private readonly cartDetailRepository: Repository<CartDetailEntity>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const userId = createOrderDto.userId;
    console.log(userId);
    const cartQuery = await this.cartRepository.createQueryBuilder('cart');
    cartQuery.where('cart.userId= :userId', { userId });
    const cartId = await cartQuery.getOne();
    const cart_id = cartId.id;
    await this.cartDetailRepository
      .createQueryBuilder()
      .delete()
      .from(CartDetailEntity)
      .where('cart_id= :cart_id', { cart_id })
      .execute();

    return this.orderRepository.createOrder(createOrderDto);
  }

  findAll() {
    return this.orderRepository.getOrders();
  }

  findOne(id: number) {
    return this.orderRepository.getOrdersById(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.updateOrders(id, updateOrderDto);
  }

  remove(id: number) {
    return this.orderRepository.deleteOrder(id);
  }
}
