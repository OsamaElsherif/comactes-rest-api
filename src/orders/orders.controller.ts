import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOtderStatusDTO } from './dto/update-order-status.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { IUserRequest } from 'src/interfaces/IUserRequest.i';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    createOrder(@Req() req:IUserRequest, @Body() createOrderDto: CreateOrderDTO) {
        const userId = req.user.id;
        return this.ordersService.createOrder(userId, createOrderDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllOrders(@Req() req: IUserRequest) {
        const userId = req.user.id;
        return this.ordersService.findAllOrders(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOrderById(@Req() req: IUserRequest, @Param('id') id: number) {
        const userId = req.user.id;
        return this.ordersService.findOrderById(userId, id);
    }

    @Roles('Admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id/status')
    updateOrderStatud(@Query('userId') userId: number, @Param('id') id: number, @Body() updateOrderStatusDto: UpdateOtderStatusDTO) {
        return this.ordersService.updateOrderStatus(userId, id, updateOrderStatusDto);
    }

    @Roles('Admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(":id")
    removeOrder(@Query('userId') userId: number, @Param(':id') id: number) {
        return this.ordersService.removeOrder(userId, id);
    }
}