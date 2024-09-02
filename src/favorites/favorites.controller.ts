import { Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { IUserRequest } from 'src/interfaces/IUserRequest.i';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @UseGuards(JwtAuthGuard)
    @Post(':productId')
    addToFavorites(@Param('productId') productId: number, @Req() req: IUserRequest) {
        const userId = req.user.id;
        return this.favoritesService.addToFavorites(userId, productId);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(':productId')
    removeFromFavorites(@Param('productId') productId: number, @Req() req: IUserRequest) {
        const userId = req.user.id;
        return this.favoritesService.removeFromFavorites(userId, productId);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    viewFavorites(@Req() req: IUserRequest) {
        const userId = req.user.id;
        return this.favoritesService.viewFavorites(userId);
    }
}
