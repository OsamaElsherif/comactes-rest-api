import { IsJSON, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsString()
    sku: string;

    @IsNotEmpty()
    @IsString()
    features: string;

    @IsNotEmpty()
    @IsString()
    image: string;

    @IsNotEmpty()
    @IsJSON()
    attachments: JSON;

    @IsNotEmpty()
    @IsNumber()
    delivery: number;

    @IsNotEmpty()
    @IsString()
    deliveryDuration: string;

    @IsNotEmpty()
    @IsNumber()
    categoryId: number;
}