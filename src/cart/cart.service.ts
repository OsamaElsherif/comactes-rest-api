import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart, CartItem } from './cart.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { CreateCartItemDTO } from './dto/create-cart-item.dto';
import { UpdateCartItemDTO } from './dto/update-cart-item.dto';
import { OrdersService } from 'src/orders/orders.service';
import { Order } from 'src/orders/order.entity';
import { CreateOrderDTO } from 'src/orders/dto/create-order.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        @InjectRepository(CartItem)
        private cartItemRepository: Repository<CartItem>,
        private usersSerice: UsersService,
        private productsService: ProductsService,
        private ordersService: OrdersService
    ) {}

    async findOneOrCreate(userId: number): Promise<Cart> {
        let cart = await this.cartRepository.findOne({where: { user: { id: userId } }, relations: ['items', 'items.product']});

        if (!cart) {
            const user = await this.usersSerice.findOneById(userId);
            if (!user) {
                throw new NotFoundException("User not found");
            }

            cart = this.cartRepository.create({user, items: []});
            cart = await this.cartRepository.save(cart);
        }

        return cart;
    }

    async addItem(userId: number, createCartItemDto: CreateCartItemDTO): Promise<Cart> {
        const cart = await this.findOneOrCreate(userId);
        const { productId, quantity } = createCartItemDto;
        const product = await this.productsService.findProductById(productId);

        if (!product) {
            throw new NotFoundException("Product not found");
        }

        let cartItem = cart.items.find(item => item.product.id == productId);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cartItem = this.cartItemRepository.create({ cart, product, quantity });
            cart.items.push(cartItem);
        }

        await this.cartItemRepository.save(cartItem);
        
        return this.cartRepository.save(cart);
    }

    async updateItem(userId: number, cartItemId: number, updateCartItemDto: UpdateCartItemDTO): Promise<Cart> {
        const cart = await this.findOneOrCreate(userId);
        const cartItem = cart.items.find(item => item.id == cartItemId);

        if (!cartItem) {
            throw new NotFoundException("Cart item not found");
        }

        cartItem.quantity = updateCartItemDto.quantity;

        await this.cartItemRepository.save(cartItem);

        return this.cartRepository.save(cart);
    }

    async removeItem(userId: number, cartItemId: number): Promise<Cart> {
        const cart = await this.findOneOrCreate(userId);
        const cartItemIndex = cart.items.findIndex(item => item.id == cartItemId);

        if (cartItemIndex === -1) {
            throw new NotFoundException("Cart item not found");
        }

        const [cartItem] = cart.items.splice(cartItemIndex, 1);

        await this.cartItemRepository.remove(cartItem);

        return this.cartRepository.save(cart);
    }

    async getCartSummery(userId: number) {
        const cart = await this.findOneOrCreate(userId);
        const total = () => {
            let t = 0;
            cart.items.forEach(item => {
                const q = item.quantity;
                const pp = item.product.price;
                t += q * pp;
            });
            return t;
        }
        return {
            "cart": cart,
            "total": total()
        }
    }
    

    async checkout(userId: number, addressId: number): Promise<Order> {
        const cart = await this.findOneOrCreate(userId)
        const order: CreateOrderDTO = {userId, items:[], addressId};
        cart.items.forEach(item => order.items.push({productId: item.product.id, quantity: item.quantity}));

        return await this.ordersService.createOrder(userId, order);
    }

    async clearCart(userId: number): Promise<void> {
        const cart = await this.findOneOrCreate(userId);
        
        await this.cartItemRepository.remove(cart.items);

        cart.items = [];

        await this.cartRepository.save(cart);
    }
}
