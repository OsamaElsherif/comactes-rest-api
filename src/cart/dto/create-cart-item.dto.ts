import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCartItemDTO {
    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}