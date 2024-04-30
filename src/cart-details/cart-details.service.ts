import { Injectable } from '@nestjs/common';
import { CreateCartDetailDto } from './dto/create-cart-detail.dto';
import { UpdateCartDetailDto } from './dto/update-cart-detail.dto';
import { CartDetailRepository } from './cart-details.repository';
@Injectable()
export class CartDetailsService {
constructor(private readonly cartDetailRepository: CartDetailRepository ){}

  create(createCartDetailDto: CreateCartDetailDto) {
    return this.cartDetailRepository.addToCart(createCartDetailDto);
  }

  findAll() {
    return this.cartDetailRepository.getCartDetails();
  }

  findOne(id: number) {
    return `This action returns a #${id} cartDetail`;
  }

  update(id: number, updateCartDetailDto: UpdateCartDetailDto) {
    return `This action updates a #${id} cartDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartDetail`;
  }
}
