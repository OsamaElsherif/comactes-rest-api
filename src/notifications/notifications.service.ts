import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateNotificationDTO } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notification)
        private notificationRepository: Repository<Notification>,
        private readonly mailerService: MailerService,
        private readonly usersService: UsersService
    ) {}
    
    // in app notifications
    async createInAppNotification(createNotificationDto: CreateNotificationDTO): Promise<Notification> {
        const userId = createNotificationDto.userId;
        const user = await this.usersService.findOneById(userId);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        const notification = this.notificationRepository.create(createNotificationDto);
        notification.user = user;
        
        return this.notificationRepository.save(notification);
    }

    async getNotifications(userId: number): Promise<Notification[]> {
        return this.notificationRepository.find({where: { user: { id: userId } } })
    } 

    async markAsRead(userId: number, notificationId: number): Promise<Notification> {
        const notifiaction = await this.notificationRepository.findOne({where: { id: notificationId, user: { id: userId } }});

        if (!notifiaction) {
            throw new NotFoundException('Notification not found');
        }

        notifiaction.read = true;
        return this.notificationRepository.save(notifiaction);
    }

    // email notifications
    async sendOrderConfirmation(email: string, orderId: number) {
        const mailOptions = {
            from: '',
            to: email,
            subject: 'Order Confirmation',
            text: `Your order with ID ${orderId} has been confirmed`
        };

        await this.mailerService.sendMail(mailOptions);
    }

    async sendShippingUpdate(email: string, orderId: number, status: string) {
        const mailOptions = {
            from: '',
            to: email,
            subject: 'Shipping Update',
            text: `Your order with ID ${orderId} is now ${status}`
        };

        this.mailerService.sendMail(mailOptions);
    }
}
