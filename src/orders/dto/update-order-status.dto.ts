import { IsNotEmpty, IsString } from "class-validator";

export class UpdateOtderStatusDTO {
    @IsNotEmpty()
    @IsString()
    status: string;
}