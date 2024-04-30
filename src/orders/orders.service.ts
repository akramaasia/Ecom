import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  
    constructor(private readonly orderRepository: OrderRepository) {}
  
  create(createOrderDto: CreateOrderDto) {
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
