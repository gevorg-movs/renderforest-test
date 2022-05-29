import { Module } from '@nestjs/common'
import { AnnouncementsController } from './announcements.controller'
import { AnnouncementsService } from './announcements.service'
import { Announcement } from './announcement.entity'
import { AnnouncementProviders } from './announcement.providers'
import { ImagesModule } from '../images/images.module'
import { AnnouncementTag } from './announcementTag.entity'
import { RegionsModule } from '../regions/regions.module'
import { CitiesModule } from '../cities/cities.module'
import { CategoriesModule } from '../categories/categories.module'

@Module({
    controllers: [AnnouncementsController],
    providers: [AnnouncementsService, ...AnnouncementProviders],
    imports: [
        Announcement,
        AnnouncementTag,
        ImagesModule,
        RegionsModule,
        CitiesModule,
        CategoriesModule,
    ],
    exports: [
        AnnouncementsService,
        Announcement,
        AnnouncementTag,
        ...AnnouncementProviders,
    ],
})
export class AnnouncementsModule {}
