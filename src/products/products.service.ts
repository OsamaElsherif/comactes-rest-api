import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Categoory } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Categoory)
        private categoryRepository: Repository<Categoory>
    ) {}

    // *** product services ***
    async createProduct(createProductDto: CreateProductDTO): Promise<Product> {
        const {categoryId, ...categoryInfo} = createProductDto;
        const category = await this.categoryRepository.findOne({where: { id: categoryId }});
        if (!category) {
            throw new NotFoundException("Category not found");
        }
        const product = this.productRepository.create({ ...categoryInfo, category })
        return this.productRepository.save(product);
    }

    async findAllProducts(): Promise<Product[]> {
        return this.productRepository.find({relations: ['category']});
    }

    async findProductById(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({where: { id }, relations: ['category']});
        if (!product) {
            throw new NotFoundException("Product not found");
        }
        return product;
    }

    // search
    async searchProducts(query: string): Promise<Product[]> {
        return this.productRepository.createQueryBuilder('product')
        .where('product.name LIKE :query', {query: `%${query}%`})
        .orWhere('product.description LIKE :query', {query: `%${query}%`})
        .getMany();
    }
    
    // filtering by price
    async filterProducts(categoryId?: number, minPrice?: number, maxPrice?: number): Promise<Product[]> {
        let queryBuilder = this.productRepository.createQueryBuilder('product');

        if (categoryId) {
            queryBuilder = queryBuilder.andWhere('product.category.id = :categoryId', { categoryId });
        }

        if (minPrice) {
            queryBuilder = queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
        }

        if (maxPrice) {
            queryBuilder = queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
        }

        return queryBuilder.getMany();
    }

    async updateProduct(id: number, updateProductDto: UpdateProductDTO): Promise<Product> {
        const product = await this.findProductById(id);
        const { categoryId, ...categoryInfo } = updateProductDto;

        if (categoryId) {
            const category = await this.categoryRepository.findOne({where: {id: categoryId}});
            if (!category) {
                throw new NotFoundException("Category not Found");
            }
            product.category = category;
        }

        Object.assign(product, categoryInfo);

        return this.productRepository.save(product);
    }

    async removeProduct(id: number): Promise<void> {
        const product = await this.findProductById(id);
        await this.productRepository.remove(product);
    }

    // *** category services ***
    async createCategory(createCategoryDto: CreateCategoryDTO): Promise<Categoory> {
        const category = this.categoryRepository.create(createCategoryDto);
        return this.categoryRepository.save(category);
    }

    async findAllCategories(): Promise<Categoory[]> {
        return this.categoryRepository.find({relations: ['products']})
    }

    async findCategoryById(id: number): Promise<Categoory> {
        const category = await this.categoryRepository.findOne({where: { id }, relations: ['products']});
        
        if (!category) {
            throw new NotFoundException("Category not found");
        }
        
        return category;
    }

    async updateCategory(id: number, updateCategoryDto: UpdateCategoryDTO): Promise<Categoory> {
        const category = await this.findCategoryById(id);
        Object.assign(category, updateCategoryDto);
        return this.categoryRepository.save(category);
    }

    async removeCategory(id: number): Promise<void> {
        const category = await this.categoryRepository.findOne({ where: { id } });
        console.log(category);
        await this.categoryRepository.remove(category);
    } 
}
