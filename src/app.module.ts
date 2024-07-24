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

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'data.db',
    entities: [User, Product, Categoory, Order, OrderItem, Cart, CartItem, Notification],
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
  }), UsersModule, AuthModule, ProductsModule, OrdersModule, CartModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
