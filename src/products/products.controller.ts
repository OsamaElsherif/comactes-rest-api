import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Roles('Admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    createProduct(@Body() createProductDto: CreateProductDTO) {
        return this.productsService.createProduct(createProductDto);
    }

    @Get()
    findAllProducts() {
        return this.productsService.findAllProducts();
    }

    @Roles('Admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("categories")
    createCategory(@Body() createCategoryDto: CreateCategoryDTO) {
        return this.productsService.createCategory(createCategoryDto);
    }

    @Get("categories")
    findAllCategories() {
        return this.productsService.findAllCategories();
    }

    @Get('search')
    searchProducts(@Query('query') query: string) {
        return this.productsService.searchProducts(query);
    }

    @Get('filter')
    filterProducts(
        @Query('categoryId') categoryId?: number,
        @Query('minPrice') minPrice?: number,
        @Query('maxPrice') maxPrice?: number
    ) {
        return this.productsService.filterProducts(categoryId, minPrice, maxPrice);
    }

    @Get("categories/:id")
    findCategoryById(@Param("id") id: number) {
        return this.productsService.findCategoryById(id);
    }

    @Roles('Admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch("categories/:id")
    updateCategory(@Param("id") id: number, @Body() updateCategoryDto: UpdateCategoryDTO) {
        return this.productsService.updateCategory(id, updateCategoryDto);
    }

    @Roles('Admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete("categories/:id")
    deleteCategory(@Param("id") id: number) {
        return this.productsService.removeCategory(id);
    }
    
    @Get(":id")
    findProductById(@Param("id") id: number) {
        return this.productsService.findProductById(id);
    }

    @Roles('Admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(":id")
    updateProduct(@Param("id") id: number, @Body() updateProductDto: UpdateProductDTO) {
        return this.productsService.updateProduct(id, updateProductDto);
    }

    @Roles('Admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(":id")
    deleteProduct(@Param("id") id: number) {
        return this.productsService.removeProduct(id);
    }
}
