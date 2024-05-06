import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
  constructor(private dataSource: DataSource) {
    super(ProductEntity, dataSource.createEntityManager());
  }
  async createProduct(createProductDto: CreateProductDto) {
    console.log(createProductDto)
    return this.save(createProductDto);
  }

  async deleteProduct(id: number) {
    const outlet = await this.findOne({ where: { id } });
    return this.remove(outlet);
  }

  async getProducts() {
    return this.find({
      relations: {
        category: true
      },
    }).catch((error) => {
      throw new NotFoundException(error);
    });
  }
  async getProductById(id: number) {
    return this.findOne({
      where: { id },
      relations: {
        category: true
      },
    });
  }

  async updateProducts(id: number, updateOutletDto: UpdateProductDto) {
    const products = await this.findOne({ where: { id } });
    return this.save({ ...products, ...updateOutletDto });
  }
}
