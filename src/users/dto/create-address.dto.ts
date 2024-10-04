import { IsString } from "class-validator";

export class createAddressDto {
    @IsString()
    country: string;
    
    @IsString()
    city: string;
    
    @IsString()
    address_line: string;
}