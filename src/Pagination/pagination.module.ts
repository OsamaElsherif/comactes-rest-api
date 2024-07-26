import { Module } from '@nestjs/common';
import { PaginationService } from './pagination.service';
import { PaginationController } from './pagination.controller';
import { ProductsModule } from 'src/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { UsersModule } from 'src/users/users.module';
import { OrdersModule } from 'src/orders/orders.module';
import { User } from 'src/users/user.entity';
import { Order } from 'src/orders/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User, Order]), ProductsModule, UsersModule, OrdersModule],
  providers: [PaginationService],
  controllers: [PaginationController],
  exports: [PaginationService]
})
export class PaginationModule {}
