import { Controller, Get, Header, Param, Post, Req, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { IUserRequest } from 'src/interfaces/IUserRequest.i';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    // @UseGuards(JwtAuthGuard)
    @Get("images/:imageName")
    async getImages(@Req() req: IUserRequest, @Param('imageName') imagename: string) {
        // const userId = req.user.id;
        const image =  await this.filesService.getImages(1, imagename);   
        const binary = Buffer.from(image);
        const imgData = new Blob([binary.buffer as BlobPart], { type: 'application/octet-binary' });
        let link = URL.createObjectURL(imgData);

        return `<img src="${link}" />`;
    }

    @UseGuards(JwtAuthGuard)
    @Post("images/")
    @UseInterceptors(FileInterceptor('file'))
    async putImage(@Req() req: IUserRequest, @UploadedFile() file) {
        const userId = req.user.id;
        return this.filesService.putImage(userId, file);
    }
}
