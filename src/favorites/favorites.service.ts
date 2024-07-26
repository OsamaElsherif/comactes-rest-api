import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorites } from './favorites.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class FavoritesService {
    constructor(
        @InjectRepository(Favorites)
        private favoritesRepository: Repository<Favorites>,
        private readonly usersService: UsersService,
        private readonly productsService: ProductsService
    ) {}

    async addToFavorites(userId: number, productId: number): Promise<Favorites> {
        const user = await this.usersService.findOneById(userId);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        const product = await this.productsService.findProductById(productId);

        if (!product) {
            throw new NotFoundException("Product not found");
        }

        const favoritesItem = this.favoritesRepository.create({user, product});
        
        return this.favoritesRepository.save(favoritesItem);
    }

    async removeFromFavorites(userId: number, productId: number): Promise<void> {
        const favoritesItem = await this.favoritesRepository.findOne({where : {user: {id: userId}}});
        
        if (!favoritesItem) {
            throw new NotFoundException("Favorites Item not found");
        }

        await this.favoritesRepository.remove(favoritesItem);
    }

    async viewFavorites(userId: number): Promise<Favorites[]> {
        return this.favoritesRepository.find({where: { user: { id: userId } }, relations: ['product']});
    }
}
