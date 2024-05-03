import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './products.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/Catagories.entity';
import { Repository } from 'typeorm';
import { CreateProductCategoryDto } from './dto/create-productcategory.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
    ) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.createProduct(createProductDto);
  }
  createCategory(createProductCategoryDto: CreateProductCategoryDto) {
    return this.categoryRepository.save(createProductCategoryDto);
  }
  
  findAll() {
    return this.productRepository.getProducts();  
  }
  findAllCategories() {
    return this.categoryRepository.find();
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
