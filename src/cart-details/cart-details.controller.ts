import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartDetailsService } from './cart-details.service';
import { CreateCartDetailDto } from './dto/create-cart-detail.dto';
import { UpdateCartDetailDto } from './dto/update-cart-detail.dto';

@Controller('cart-details')
export class CartDetailsController {
  constructor(private readonly cartDetailsService: CartDetailsService) {}

  @Post()
  create(@Body() createCartDetailDto: CreateCartDetailDto) {
    return this.cartDetailsService.create(createCartDetailDto);
  }

  @Get()
  findAll() {
    return this.cartDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDetailDto: UpdateCartDetailDto) {
    return this.cartDetailsService.update(+id, updateCartDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartDetailsService.remove(+id);
  }
}
