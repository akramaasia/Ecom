import { IsOptional } from 'class-validator';

export class OrderDeatilsDto {
  
  @IsOptional()
    orderDetails?: number [];
}
