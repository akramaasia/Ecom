import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductRepository } from './products.repository';
import { CategoryEntity } from './entities/Catagories.entity';
@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository, CategoryEntity],
})
export class ProductsModule {}
