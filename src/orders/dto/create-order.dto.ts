import { ArrayNotEmpty, IsNotEmpty, IsNumber } from "class-validator";

export class OrderItemDTO {
    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}

export class CreateOrderDTO {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    @ArrayNotEmpty()
    items: OrderItemDTO[];

    @IsNumber()
    addressId: number;
}