import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CartEntity } from 'src/user/entities/cart.entity';
import { CartDetailEntity } from './entities/cart-detail.entity';
import { CreateCartDetailDto } from './dto/create-cart-detail.dto';
import { UpdateCartDetailDto } from './dto/update-cart-detail.dto';
import { ProductEntity } from 'src/products/entities/product.entity';
import { CartRepository } from 'src/user/cart.repository';

@Injectable()
export class CartDetailRepository extends Repository<CartDetailEntity> {
  constructor(private dataSource: DataSource) {
    super(CartDetailEntity, dataSource.createEntityManager());
  }
  async addToCart(createCartDetailDto: CreateCartDetailDto) {
    
    const cartValues = new CartDetailEntity();
    cartValues.cartId = createCartDetailDto.cartId;

    cartValues.products = createCartDetailDto.productIds.map((id) => ({
      ...new ProductEntity(),
      id,
    }));
    return this.save(cartValues);
  }
  
  async deleteCartDetails(id: number) {
    const cartDetail = await this.findOne({ where: { id } });
    return this.remove(cartDetail);
  }

  async getCartDetails() {
    return this.find({
      relations: {
        products: true,
      },
    }).catch((error) => {
      throw new NotFoundException(error);
    });
  }
  async getCartDeatialsById(id: number) {
    return this.findOne({
      where: { id },
      relations: {
        products: true,
      },
    });
  }

  async updateCartDetails(
    id: number,
    updateCartDetailsDto: UpdateCartDetailDto,
  ) {
    const cartDetails = await this.findOne({ where: { id } });
    return this.save({ ...cartDetails, ...updateCartDetailsDto });
  }
}
