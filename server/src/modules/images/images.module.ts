import { forwardRef, Module } from '@nestjs/common'
import { ImagesController } from './images.controller'
import { ImagesService } from './images.service'
import { Image } from './image.entity'
import { ImagesProviders } from './images.providers'
import { AnnouncementsModule } from '../announcements/announcements.module'

@Module({
    controllers: [ImagesController],
    providers: [ImagesService, ...ImagesProviders],
    imports: [Image, forwardRef(() => AnnouncementsModule)],
    exports: [ImagesService, Image, ...ImagesProviders],
})
export class ImagesModule {}
