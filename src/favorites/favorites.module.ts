import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './favorites.entity';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Favorites]), UsersModule, ProductsModule],
  providers: [FavoritesService],
  controllers: [FavoritesController],
  exports: [FavoritesService]
})

export class FavoritesModule {}
