import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { IUserRequest } from 'src/interfaces/IUserRequest.i';

@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Post(':productId')
    addToFavorites(@Param('productId') productId: number, @Req() req: IUserRequest) {
        const userId = req.user.id;
        return this.favoritesService.addToFavorites(userId, productId);
    }

    @Delete(':productId')
    removeFromFavorites(@Param('productId') productId: number, @Req() req: IUserRequest) {
        const userId = req.user.id;
        return this.favoritesService.removeFromFavorites(userId, productId);
    }

    @Get()
    viewFavorites(@Req() req: IUserRequest) {
        const userId = req.user.id;
        return this.favoritesService.viewFavorites(userId);
    }
}
