import { Controller, Get, Query } from '@nestjs/common';
import { PaginationService } from './pagination.service';
import { GenericFilter } from 'src/interfaces/GenericFilter.interface';

@Controller('pagination')
export class PaginationController {
    constructor(
        private readonly paginationService: PaginationService
    ) {}

    @Get('products')
    async findAllProductsPaginated(@Query() filter: GenericFilter) {
        return this.paginationService.findAllProductsPaginated(filter);
    }
}
