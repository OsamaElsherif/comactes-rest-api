import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.entity';
import { Categoory } from './products/category.entity';
import { OrdersModule } from './orders/orders.module';
import { Order, OrderItem } from './orders/order.entity';
import { CartModule } from './cart/cart.module';
import { Cart, CartItem } from './cart/cart.entity';
import { NotificationsModule } from './notifications/notifications.module';
import { Notification } from './notifications/notification.entity';
import { PaginationModule } from './Pagination/pagination.module';
import { FavoritesModule } from './favorites/favorites.module';
import { Favorites } from './favorites/favorites.entity';
import { FilesController } from './files/files.controller';
import { FilesModule } from './files/files.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import filesystem  from './config/filesystem';
import { StorageModule } from '@squareboat/nest-storage';
import { Address } from './users/address.entity';

@Module({
  imports: 
  [
    StorageModule.registerAsync({
      imports: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get('filesystem');
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [filesystem]
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.db',
      entities: [Address, User, Product, Categoory, Order, OrderItem, Cart, CartItem, Notification, Favorites],
      synchronize: true
    }),
    MailerModule.forRoot({
      transport: {
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "c041ccc0f01d8d",
          pass: "c10cc30381c14a"
        }
      }
    }), UsersModule, AuthModule, ProductsModule, OrdersModule, CartModule, NotificationsModule, PaginationModule, FavoritesModule, FilesModule
  ],
  controllers: [AppController, FilesController],
  providers: [AppService],
})
export class AppModule {}