import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOtderStatusDTO } from './dto/update-order-status.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    createOrder(@Body() createOrderDto: CreateOrderDTO) {
        return this.ordersService.createOrder(createOrderDto);
    }

    @Get()
    getAllOrders() {
        return this.ordersService.findAllOrders();
    }

    @Get(':id')
    findOrderById(@Param('id') id: number) {
        return this.ordersService.findOrderById(id);
    }

    @Roles ('Admin')
    @UseGuards(RolesGuard)
    @Patch(':id/status')
    updateOrderStatud(@Param('id') id: number, @Body() updateOrderStatusDto: UpdateOtderStatusDTO) {
        return this.ordersService.updateOrderStatus(id, updateOrderStatusDto);
    }

    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Delete(":id")
    removeOrder(@Param(':id') id: number) {
        return this.ordersService.removeOrder(id);
    }
}