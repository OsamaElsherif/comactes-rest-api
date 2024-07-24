import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { IUserRequest } from 'src/interfaces/IUserRequest.i';
import { CreateNotificationDTO } from './dto/create-notification.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private readonly notificationsService: NotificationsService,
    ) {}

    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Post()
    createNotification(@Body() createNotificationDto: CreateNotificationDTO) {
        return this.notificationsService.createInAppNotification(createNotificationDto);
    }

    @Get()
    getNotification(@Req() req: IUserRequest) {
        const userId = req.user.id;
        return this.notificationsService.getNotifications(userId);
    }

    @Patch(':notificationId')
    markAsRead(@Param('notificationId') notificationId: number) {
        return this.notificationsService.markAsRead(notificationId);
    }
}
