import { isString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCartDetailDto {
    
  @IsNumber()
  cartId: number;
  @IsNumber()
  userId: number;
  @IsOptional()
  productIds: number[];
}
