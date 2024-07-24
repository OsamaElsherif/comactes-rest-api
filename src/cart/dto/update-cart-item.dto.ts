import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateCartItemDTO {
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}