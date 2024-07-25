import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";
import { toNumber } from "src/common/helper/cast.helper";

export class GenericFilter {
    @Transform(({value}) => toNumber(value, {default: 1, min: 1}))
    @IsNumber()
    public page: number;

    @Transform(({value}) => toNumber(value, {default: 5, min: 1, max: 10}))
    @IsNumber()
    public pageSize: number;    
}