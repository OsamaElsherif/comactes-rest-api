import { Controller, Get, Query } from '@nestjs/common';
import { PaginationService } from './pagination.service';
import { GenericFilter } from 'src/interfaces/GenericFilter.interface';
import { IUser } from 'src/interfaces/User.interface';

@Controller('pagination')
export class PaginationController {
    constructor(
        private readonly paginationService: PaginationService
    ) {}

    // public
    @Get('products')
    async findAllProductsPaginated(@Query() filter: GenericFilter & IUser) {
        return this.paginationService.findAllProductsPaginated(filter);
    }

    // admins only
    @Get('users')
    async findAllUsersPaginated(@Query() filter: GenericFilter & IUser) {
        return this.paginationService.findAllUsersPaginated(filter);
    }

    // logged in user
    @Get('favorites')
    async findFavoriteProductsPaginated(@Query() filter: GenericFilter & IUser) {
        return this.paginationService.findFavoriteProductsPaginated(filter);
    }

    // admins only
    @Get('orders/all')
    async findAllOrdersPaginated(@Query() filter: GenericFilter & IUser) {
        return this.paginationService.findAllOrdersPaginated(filter);
    }

    // logged in user
    @Get('orders')
    async findOrdersPaginated(@Query() filter: GenericFilter & IUser) {
        return this.paginationService.findOrdersPaginated();
    }
}
