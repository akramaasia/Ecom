import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductCategoryDto } from './dto/create-productcategory.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
  @Post('categories')
  createCategory(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productsService.createCategory(createProductCategoryDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
  @Get("categories")
  findAllCategories() {
    return this.productsService.findAllCategories();
  }
  @Get("categories/:id")
  findCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findCategoryById(id);
  }
  @Patch("categories/:id")
  UpdateCategoryById(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProductCategory(id, updateProductDto);
  }

  @Delete('categories/:id')
  removeCAtegory(@Param('id') id: string) {
    return this.productsService.deleteProductCategory(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
