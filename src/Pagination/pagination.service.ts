import { Injectable } from '@nestjs/common';
import { PageService } from './page.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { ILike, Repository } from 'typeorm';
import { GenericFilter } from 'src/interfaces/GenericFilter.interface';
import { User } from 'src/users/user.entity';
import { Order } from 'src/orders/order.entity';
import { Favorites } from 'src/favorites/favorites.entity';
import { IUser } from 'src/interfaces/User.interface';

@Injectable()
export class PaginationService extends PageService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(Favorites)
        private favoritesRepository: Repository<Favorites>
    ) {
        super();
    }

    // find all products.
    async findAllProductsPaginated( filter: GenericFilter) {
        const { ...params } = filter;

        return await this.paginate(
            this.productRepository,
            filter
        )
    }

    // all users for admin only
    async findAllUsersPaginated(filter: GenericFilter) {
        const { ...params } = filter;

        return await this.paginate(
            this.userRepository,
            filter
        )
    }

    // all orders for admin only
    async findAllOrdersPaginated(filter: GenericFilter & IUser) {
        const { ...params } = filter;

        return await this.paginate(
            this.orderRepository,
            filter,
            this.createWhereQuery(params)
        )
    }

    // loged in user find orders
    async findOrdersPaginated(filter: GenericFilter & IUser) {
        const { ...params } = filter;

        return await this.paginate(
            this.orderRepository,
            filter,
            this.createWhereQuery(params)
        )
    }

    // loged in user find favorites
    // !Bug : doesn't return the product map.
    async findFavoriteProductsPaginated(filter: GenericFilter & IUser) {
        const { ...params } = filter;

        return await this.paginate(
            this.favoritesRepository,
            filter,
            this.createWhereQuery(params)
        )
    }

    private createWhereQuery(params: IUser) {
        const where: any = {};

        if (params.userId) {
            where.user = ILike(`%${params.userId}%`)
        }

        return where;
    }
}
