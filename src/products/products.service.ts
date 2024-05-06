import { Injectable, NotFoundException } from '@nestjs/common';
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
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.createProduct(createProductDto);
  }

  // async create(createCartDetailDto: CreateCartDetailDto) {
  //   const userId = createCartDetailDto.userId;
  //   const cartID = new CartEntity();
  //   const cartQuery = await this.cartRepository.createQueryBuilder('cart1');
  //   cartQuery.where('cart1.userId= :userId', { userId });
  //   const cart_Id = await cartQuery.getOne();
  //   createCartDetailDto.cartId = cart_Id.id;
  //   return this.cartDetailRepository.addToCart(createCartDetailDto);
  // }

  async findAll() {
    const products = await this.productRepository.getProducts();
   
    // console.log(products);
    // let appendedValues = "";
    // for (let i = 0; i < products.length; i++) {
    //   const product = products[i];
    //   console.log(`Product: ${product.name}`);
    //   console.log(product.category.id);
    //   const parentsID=await this.findCategoryById(product.category.id)
    //   console.log(parentsID)
    //   //product.category.parentCategory_id=product.category.id
    //   console.log(product.category.id);
     
    // }
   return products;
    // return
  }

  // async findProductCategoryParentId(categoryId) {
  //   const productCategory = findCategoryById(categoryId);
  //   return productCategory ? productCategory.parentId : null;
  // }
  // async findCategoryById(id) {
  //   // This is a placeholder function assuming you have a categories array or a database query to fetch categories
  //   return categories.find(category => category.id === id);
  // }

  findOne(id: number) {
    return this.productRepository.getProductById(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.updateProducts(id, updateProductDto);
  }

  remove(id: number) {
    return this.productRepository.deleteProduct(id);
  }

  //Category Fucntions

  createCategory(createProductCategoryDto: CreateProductCategoryDto) {
    return this.categoryRepository.save(createProductCategoryDto);
  }

  findAllCategories() {
    return this.categoryRepository
      .find({
        relations: {
          products: true,
        },
      })
      .catch((error) => {
        throw new NotFoundException(error);
      });
  }

  findCategoryById(id: number) {
    return this.categoryRepository.findOne({
      where: { id },
      // relations: {
      //   products: true
      // },
    });
  }

  async deleteProductCategory(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    return this.categoryRepository.remove(category);
  }

  async updateProductCategory(id: number, updateOutletDto: UpdateProductDto) {
    const productsCat = await this.categoryRepository.findOne({
      where: { id },
    });
    return this.categoryRepository.save({ ...productsCat, ...updateOutletDto });
  }
}
