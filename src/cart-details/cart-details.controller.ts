import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CartDetailsService } from './cart-details.service';
import { CreateCartDetailDto } from './dto/create-cart-detail.dto';
import { UpdateCartDetailDto } from './dto/update-cart-detail.dto';
import { JwtAuthGuard } from 'src/authguard/jwt.guard';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthGuard } from 'src/authguard/auth.guard';

@Controller('cart-details')
export class CartDetailsController {
  constructor(private readonly cartDetailsService: CartDetailsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@GetUser() user: UserEntity,@Body() createCartDetailDto: CreateCartDetailDto) {
    createCartDetailDto.userId=user.id;
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
