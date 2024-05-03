import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { JwtAuthGuard } from 'src/authguard/jwt.guard';
import { AuthGuard } from 'src/authguard/auth.guard';
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@GetUser() user: UserEntity, @Body() createOrderDto: CreateOrderDto) {
    console.log(user.id);
    createOrderDto.userId = user.id;
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
