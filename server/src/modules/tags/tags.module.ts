import { Module } from '@nestjs/common'
import { TagsController } from './tags.controller'
import { TagsService } from './tags.service'
import { Tag } from './tag.entity'
import { TagsProviders } from './tags.providers'
import { AnnouncementTag } from '../announcements/announcementTag.entity'

@Module({
    controllers: [TagsController],
    providers: [TagsService, ...TagsProviders],
    imports: [Tag, AnnouncementTag],
    exports: [TagsService, Tag, ...TagsProviders],
})
export class TagsModule {}
