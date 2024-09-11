import { Injectable, NotFoundException } from '@nestjs/common';
import { Storage } from '@squareboat/nest-storage';
import { UsersService } from 'src/users/users.service';
import { File } from './file.dto';

@Injectable()
export class FilesService {
    constructor(
        private readonly usersService: UsersService
    ) {}

    async getImages(userId: number, imagename: string) {
        const user = await this.usersService.findOneById(userId);

        if (!user) {
            throw new NotFoundException("user not found");
        }

        return await Storage.disk('products').get(imagename)
    }

    async putImage(userId: number, file: File) {
        const user = await this.usersService.findOneById(userId);

        if (!user) {
            throw new NotFoundException("user not found")
        }

        return await Storage.disk('products').put(file.originalname, file.buffer);
    }
}
