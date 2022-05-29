import { Sequelize } from 'sequelize-typescript'
import { User } from '../modules/users/user.entity'
import { Announcement } from '../modules/announcements/announcement.entity'
import { Region } from '../modules/regions/region.entity'
import { City } from '../modules/cities/city.entity'
import { Image } from '../modules/images/image.entity'
import { Tag } from '../modules/tags/tag.entity'
import { Category } from '../modules/categories/category.entity'
import { AnnouncementTag } from '../modules/announcements/announcementTag.entity'
import { Dialect } from 'sequelize/types/sequelize'

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {

            const sequelize = new Sequelize({
                dialect: process.env.DB_DIALECT as Dialect,
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
            })
            sequelize.addModels([
                User,
                Announcement,
                Region,
                City,
                Image,
                Tag,
                Category,
                AnnouncementTag,
            ])
            await sequelize.sync()
            return sequelize
        },
    },
]
