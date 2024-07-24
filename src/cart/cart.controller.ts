import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { IUserRequest } from 'src/interfaces/IUserRequest.i';
import { CreateCartItemDTO } from './dto/create-cart-item.dto';
import { UpdateCartItemDTO } from './dto/update-cart-item.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('add')
    @UseGuards(JwtAuthGuard)
    addItem(@Req() req: IUserRequest, @Body() createCartItemDto: CreateCartItemDTO) {
        const userId = req.user.id;
        return this.cartService.addItem(userId, createCartItemDto);
    }

    @Patch("update/:itemId")
    @UseGuards(JwtAuthGuard)
    updateItem(@Req() req: IUserRequest, @Param('itemId') itemId: number, @Body() updateCartItemDto: UpdateCartItemDTO) {
        const userId = req.user.id;
        return this.cartService.updateItem(userId, itemId, updateCartItemDto);
    }

    @Delete("remove/:itemId")
    @UseGuards(JwtAuthGuard)
    removeItem(@Req() req: IUserRequest, @Param('itemId') itemId: number) {
        const userId = req.user.id;
        return this.cartService.removeItem(userId, itemId);
    }

    @Get("summary")
    @UseGuards(JwtAuthGuard)
    getCartSummary(@Req() req: IUserRequest) {
        const userId = req.user.id;
        return this.cartService.getCartSummery(userId)
    }

    @Post("checkout")
    @UseGuards(JwtAuthGuard)
    async checkout(@Req() req: IUserRequest) {
        const userId = req.user.id;
        // order placement
        await this.cartService.checkout(userId);
        // order payment goes here

        await this.cartService.clearCart(userId);
        
        return { message: "Ckeckout Completed" }
    }
}
