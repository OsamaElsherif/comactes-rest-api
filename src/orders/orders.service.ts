import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderItem } from './order.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOtderStatusDTO } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private orderItemsRepository: Repository<OrderItem>,
        private usersService: UsersService,
        private productsService: ProductsService
    ) {}

    async createOrder(userId: number, createOrderDto: CreateOrderDTO): Promise<Order> {
        userId = userId;
        const {items} = createOrderDto;

        const user = await this.usersService.findOneById(userId);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        const orderItems: OrderItem[] = [];
        let total = 0;

        for (const item of items) {
            const product = await this.productsService.findProductById(item.productId);
            
            if (!product) {
                throw new NotFoundException("Product not found");
            }

            const orderItem = this.orderItemsRepository.create({
                product: product,
                quantity: item.quantity,
                price: product.price * item.quantity,
            });

            orderItems.push(orderItem);
            total += orderItem.price;
        }

        const order = this.ordersRepository.create({
            user,
            status: "placed",
            total,
            items: orderItems,
        });

        return this.ordersRepository.save(order);
    }
    
    async findAllOrders(userId: number): Promise<Order[]> {
        return this.ordersRepository.find({ where: {user: { id: userId }}, relations: ['user', 'items', 'items.product']});
    }
    
    async findOrderById(userId: number, id: number): Promise<Order> {
        const order = await this.ordersRepository.findOne({where: {id, user: {id: userId}}, relations: ['user', 'items', 'items.product']});

        if (!order) {
            throw new NotFoundException("Order not found");
        }

        return order;
    }
    
    async updateOrderStatus(userId: number, id: number, updateOrderStatusDto: UpdateOtderStatusDTO): Promise<Order> {
        const order = await this.findOrderById(userId, id);

        if (!order) {
            throw new NotFoundException("Order not found");
        }

        order.status = updateOrderStatusDto.status;

        return this.ordersRepository.save(order);
    }
    
    async removeOrder(userId: number, id: number): Promise<void> {
        const order = await this.findOrderById(userId, id);
        
        if (!order) {
            throw new NotFoundException("Order not found");
        }

        await this.ordersRepository.remove(order);
    }
}
