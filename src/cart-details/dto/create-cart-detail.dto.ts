import { isString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCartDetailDto {
  @IsNumber()
   cartid: number ;

  @IsOptional()
  productIds: number[];
}
