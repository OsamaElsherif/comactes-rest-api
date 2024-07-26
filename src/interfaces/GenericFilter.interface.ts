import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { toNumber } from "src/common/helper/cast.helper";

export class GenericFilter {
    @Transform(({value}) => toNumber(value, {min: 1}))
    @IsNumber()
    public page: number = 1;

    @Transform(({value}) => toNumber(value, {min: 1, max: 40}))
    @IsNumber()
    public pageSize: number = 15;
}