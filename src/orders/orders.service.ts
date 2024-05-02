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
  console.log(userId)
    //const cart_id = await this.cartRepository.findOne({ where: { id } });
    const cartQuery= await this.cartRepository.createQueryBuilder('cart')
    cartQuery.where('cart.userId= :userId', {userId})
    const cartId = await cartQuery.getOne();
    const cart_id=cartId.id;
   // const queryBuilder = this.cartDetailRepository.createQueryBuilder('cartDetails');
    
    
   // queryBuilder.where('cartDetails.cart_id= :cart_id', { cart_id });
await this.cartDetailRepository.createQueryBuilder().delete().from(CartDetailEntity).where
("cart_id= :cart_id", { cart_id}).execute();
    //Execute the query
   // const data = await queryBuilder.getMany();
    //console.log(data)
    

    // queryBuilder.delete();//.where('cartDetails.cart_id= :cart_id', { cart_id });
    //await queryBuilder.execute();
  //await queryBuilder.delete().execute();
    // Execute the query
    //const users = await queryBuilder.getMany();

//console.log(queryBuilder);
  //   const cartDet=await this.cartDetailRepository.createQueryBuilder('cart')
  //  .where('cart.cart_id = : cart_id', {cart}).getOne();
   
  
    //const result = await queryBuilder.delete().execute();

    // const cartDetails=await this.cartDetailRepository.findOne({ where : cartDet})
    // if (cartDetails)
    //   {
    //     cartDetails.products=[];
    //     await this.cartDetailRepository.remove(cartDetails);
    //   }
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
