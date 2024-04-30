import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { OrdersEntity } from './entities/order.entity';
import { OrderDetailEntity } from './entities/orderDetails.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderDeatilsDto } from './dto/orderDetails.dto';
import { ProductEntity } from 'src/products/entities/product.entity';
@Injectable()
export class OrderRepository extends Repository<OrdersEntity> {
  constructor(private dataSource: DataSource) {
    super(OrdersEntity, dataSource.createEntityManager());
  }
  //   async createOrder(createOrderDto: CreateOrderDto) {
  //     return this.save(createOrderDto);
  //   }

  async createOrder(createOrderdto: CreateOrderDto) {
    const orders = this.create(createOrderdto as Partial<OrdersEntity>);
    orders.products=createOrderdto.productIds.map((id) => ({
      ...new ProductEntity(),
      id,
    }));
    
    return this.save(orders);
  }

  async deleteOrder(id: number) {
    const outlet = await this.findOne({ where: { id } });
    return this.remove(outlet);
  }

  async getOrders() {
    return this.find({
      relations: {
        products: true,
      },
    }).catch((error) => {
      throw new NotFoundException(error);
    });
  }
  async getOrdersById(id: number) {
    return this.findOne({
      where: { id },
    });
  }

  async updateOrders(id: number, updateOutletDto: UpdateOrderDto) {
    const order = await this.findOne({ where: { id } });
    //return this.save({ ...order, ...updateOutletDto });
  }
}
