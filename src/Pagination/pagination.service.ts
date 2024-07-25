import { Injectable } from '@nestjs/common';
import { PageService } from './page.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { Repository } from 'typeorm';
import { GenericFilter } from 'src/interfaces/GenericFilter.interface';

@Injectable()
export class PaginationService extends PageService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
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
}
