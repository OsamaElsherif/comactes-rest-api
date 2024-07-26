import { Controller, Get, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { PaginationService } from './pagination.service';
import { GenericFilter } from 'src/interfaces/GenericFilter.interface';
import { IUser } from 'src/interfaces/User.interface';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { IUserRequest } from 'src/interfaces/IUserRequest.i';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Controller('pagination')
export class PaginationController {
    constructor(
        private readonly paginationService: PaginationService
    ) {}

    // public
    @Get('products')
    async findAllProductsPaginated(@Query() filter: GenericFilter) {
        return this.paginationService.findAllProductsPaginated(filter);
    }

    // admins only
    @Get('users')
    @Roles('Admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async findAllUsersPaginated(@Query() filter: GenericFilter) {
        return this.paginationService.findAllUsersPaginated(filter);
    }

    // logged in user
    @Get('favorites')
    @UseGuards(JwtAuthGuard)
    async findFavoriteProductsPaginated(@Req() req: IUserRequest, @Query() filter: GenericFilter & IUser) {
        const userId = req.user.id;
        filter.userId = userId;

        return this.paginationService.findFavoriteProductsPaginated(filter);
    }

    // admins only
    @Get('orders/all')
    @Roles('Admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async findAllOrdersPaginated(@Query() filter: GenericFilter & IUser) {
        return this.paginationService.findAllOrdersPaginated(filter);
    }

    // logged in user
    @Get('orders')
    @UseGuards(JwtAuthGuard)
    async findOrdersPaginated(@Req() req: IUserRequest, @Query() filter: GenericFilter & IUser) {
        const userId = req.user.id;
        filter.userId = userId;
        
        return this.paginationService.findOrdersPaginated(filter);
    }
}
