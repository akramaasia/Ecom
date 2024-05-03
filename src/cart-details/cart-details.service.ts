import { Injectable } from '@nestjs/common';
import { CreateCartDetailDto } from './dto/create-cart-detail.dto';
import { UpdateCartDetailDto } from './dto/update-cart-detail.dto';
import { CartDetailRepository } from './cart-details.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from 'src/user/entities/cart.entity';
import { Repository } from 'typeorm';
import { CartRepository } from 'src/user/cart.repository';
@Injectable()
export class CartDetailsService {
  constructor(
    private readonly cartDetailRepository: CartDetailRepository,
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly cartCustomRep: CartRepository,
  ) {}

  async create(createCartDetailDto: CreateCartDetailDto) {
    const userId = createCartDetailDto.userId;
    const cartID = new CartEntity();
    const cartQuery = await this.cartRepository.createQueryBuilder('cart1');
    cartQuery.where('cart1.userId= :userId', { userId });
    const cart_Id = await cartQuery.getOne();
    console.log(cart_Id.id);
    createCartDetailDto.cartId = cart_Id.id;
    return this.cartDetailRepository.addToCart(createCartDetailDto);
  }

  findAll() {
    return this.cartDetailRepository.getCartDetails();
  }

  findOne(id: number) {
    return this.cartDetailRepository.getCartDeatialsById(id);
  }

  update(id: number, updateCartDetailDto: UpdateCartDetailDto) {
    return `This action updates a #${id} cartDetail`;
  }

  remove(id: number) {
    return this.cartDetailRepository.deleteCartDetails(id);
  }
}
