import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Image } from './image.entity'
import { Announcement } from '../announcements/announcement.entity'
import * as fs from 'fs'

@Injectable()
export class ImagesService {
    constructor(
        @Inject('IMAGES_REPOSITORY')
        private imagesRepository: typeof Image,
        @Inject('ANNOUNCEMENTS_REPOSITORY')
        private announcementsRepository: typeof Announcement,
    ) {}

    async create(announcementId: number, path: string) {
        return this.imagesRepository.create({
            announcementId,
            src: path,
        })
    }

    async deleteAnnouncementImage(imageId: number) {
        const image = await this.imagesRepository.findByPk(imageId)

        if (!image) {
            throw new NotFoundException({ message: 'Image not found' })
        }

        fs.unlink(image.src, () => {})

        await image.destroy()
    }

    async uploadAnnouncementImage(
        announcementId: number,
        image: Express.Multer.File,
    ) {
        return this.create(announcementId, image.path)
    }
}
