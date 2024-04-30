import { IsOptional } from "class-validator";
import { ProductEntity } from "src/products/entities/product.entity";
export class OrderProductDto {
    
    @IsOptional()
    products : ProductEntity[];
}
