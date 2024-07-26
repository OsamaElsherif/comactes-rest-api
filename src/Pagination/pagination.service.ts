import { Injectable } from '@nestjs/common';
import { PageService } from './page.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { Repository } from 'typeorm';
import { GenericFilter } from 'src/interfaces/GenericFilter.interface';
import { User } from 'src/users/user.entity';
import { Order } from 'src/orders/order.entity';

@Injectable()
export class PaginationService extends PageService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
    ) {
        super();
    }

    async findAllProductsPaginated( filter: GenericFilter) {
        const { ...params } = filter;

        return await this.paginate(
            this.productRepository,
            filter
        )
    }

    // all users
    async findAllUsersPaginated(filter: GenericFilter) {
        const { ...params } = filter;

        return await this.paginate(
            this.userRepository,
            filter
        )
    }

    // all orders
    async findAllOrdersPaginated(filter: GenericFilter) {
        const { ...params } = filter;

        return await this.paginate(
            this.orderRepository,
            filter
        )
    }

    // loged in user
    async findOrdersPaginated() {}

    // loged in user
    async findFavoriteProductsPaginated() {}
}
