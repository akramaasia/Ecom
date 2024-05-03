import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './products.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/Catagories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    ) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.createProduct(createProductDto);
  }
  
  findAll() {
    return this.productRepository.getProducts();
  }

  findOne(id: number) {
    return this.productRepository.getProductById(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.updateProducts(id, updateProductDto);
  }

  remove(id: number) {
    return this.productRepository.deleteProduct(id);
  }
}
