import {Controller, Delete, Param, Post, UploadedFile, UseGuards, UseInterceptors,} from '@nestjs/common'
import {JwtAuthGuard} from '../auth/auth.jwt-auth.guard'
import {ImagesService} from './images.service'
import {FileInterceptor} from '@nestjs/platform-express'
import {diskStorage} from 'multer'
import {AnnouncementsHelpers} from '../announcements/announcements.helpers'

@Controller('images')
@UseGuards(JwtAuthGuard)
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @Post(':announcementId')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './public/images',
                filename: AnnouncementsHelpers.generateImageRandomName,
            }),
        }),
    )
    async uploadAnnouncementImage(
        @Param('announcementId') announcementId: number,
        @UploadedFile() image: Express.Multer.File,
    ) {
        return await this.imagesService.uploadAnnouncementImage(
            announcementId,
            image,
        )
    }

    @Delete(':imageId')
    async deleteAnnouncementImage(@Param('imageId') imageId: number) {
        return await this.imagesService.deleteAnnouncementImage(imageId)
    }
}
