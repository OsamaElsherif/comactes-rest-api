import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { IUserRequest } from 'src/interfaces/IUserRequest.i';
import { CreateNotificationDTO } from './dto/create-notification.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private readonly notificationsService: NotificationsService,
    ) {}

    @Roles('Admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    createNotification(@Body() createNotificationDto: CreateNotificationDTO) {
        return this.notificationsService.createInAppNotification(createNotificationDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getNotification(@Req() req: IUserRequest) {
        const userId = req.user.id;
        return this.notificationsService.getNotifications(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':notificationId')
    markAsRead(@Req() req: IUserRequest, @Param('notificationId') notificationId: number) {
        const userId = req.user.id;
        return this.notificationsService.markAsRead(userId, notificationId);
    }
}
