import {
    ForbiddenException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { Announcement } from './announcement.entity'
import { CreateAnnouncementDto } from './dto/create-announcement.dto'
import { User } from '../users/user.entity'
import { UpdateAnnouncementDto } from './dto/update-announcement.dto'
import { Op, WhereOptions } from 'sequelize'
import { Image } from '../images/image.entity'
import { AnnouncementTag } from './announcementTag.entity'
import { Tag } from '../tags/tag.entity'
import { Category } from '../categories/category.entity'
import { Region } from '../regions/region.entity'
import { City } from '../cities/city.entity'
import { CitiesService } from '../cities/cities.service'

@Injectable()
export class AnnouncementsService {
    constructor(
        @Inject('ANNOUNCEMENTS_REPOSITORY')
        private announcementsRepository: typeof Announcement,
        @Inject('CATEGORIES_REPOSITORY')
        private categoriesRepository: typeof Category,
        @Inject('REGIONS_REPOSITORY')
        private regionsRepository: typeof Region,
        @Inject('CITIES_REPOSITORY')
        private citiesRepository: typeof City,
        private readonly citiesService: CitiesService,
    ) {}

    async findAll(params): Promise<Announcement[]> {
        const {
            title,
            priceMin,
            priceMax,
            tagIds = [],
            regionId,
            cityId,
            categoryId,
            userId,
        } = params

        const where: WhereOptions = {}

        if (userId) {
            where.userId = userId
        }

        if (title) {
            where.title = {
                [Op.substring]: title,
            }
        }

        if (priceMin) {
            where.price = {
                [Op.gte]: priceMin,
            }
        }

        if (priceMax) {
            if (!where.price) {
                where.price = {}
            }
            where.price[Op.lte] = priceMax
        }

        if (regionId) {
            where.regionId = regionId
        }

        if (cityId) {
            where.cityId = cityId
        }

        if (categoryId) {
            where.categoryId = categoryId
        }

        return this.announcementsRepository.findAll({
            where,
            include: [
                {
                    model: Image,
                    limit: 1,
                },
                {
                    model: Tag,
                    required: tagIds.length,
                    through: {
                        where: {
                            tagId: tagIds,
                        },
                    },
                },
            ],
        })
    }

    async findOne(id: number) {
        const announcement = await this.announcementsRepository.findByPk(id, {
            include: [Image, Tag],
        })

        if (!announcement) {
            throw new NotFoundException({
                message: 'Announcement not found',
            })
        }

        const city = await this.citiesRepository.findByPk(announcement.cityId)
        const region = await this.regionsRepository.findByPk(
            announcement.regionId,
        )
        const category = await this.categoriesRepository.findByPk(
            announcement.categoryId,
        )

        return {
            announcement,
            city,
            region,
            category,
        }
    }

    async create(user: User, data: CreateAnnouncementDto) {
        await this.citiesService.checkIfCityBelongsToRegion(
            data.cityId,
            data.regionId,
        )

        return this.announcementsRepository.create({
            userId: user.id,
            ...data,
        })
    }

    async update(user: User, announcementId, data: UpdateAnnouncementDto) {
        const announcement = await this.announcementsRepository.findByPk(
            announcementId,
            {
                include: [Tag],
            },
        )

        if (!announcement) {
            throw new NotFoundException({
                message: 'Announcement not found',
            })
        }

        if (announcement.userId != user.id) {
            throw new ForbiddenException({
                message: 'You dont have a permission for this action',
            })
        }

        await this.citiesService.checkIfCityBelongsToRegion(
            data.cityId,
            data.regionId,
        )

        await announcement.$set('tags', data.tagIds)

        return announcement.update({
            ...data,
        })
    }

    async delete(user: User, announcementId) {
        const announcement = await this.announcementsRepository.findByPk(
            announcementId,
        )

        if (!announcement) {
            throw new NotFoundException({
                message: 'Announcement not found',
            })
        }

        if (announcement.userId != user.id) {
            throw new ForbiddenException({
                message: 'You dont have a permission for this action',
            })
        }

        await announcement.$remove('tags', announcement.tags)

        return announcement.destroy()
    }

    async addTags(announcement: Announcement, tagIds: number[]) {
        await announcement.$add('tags', tagIds, {
            through: AnnouncementTag,
        })
    }
}
