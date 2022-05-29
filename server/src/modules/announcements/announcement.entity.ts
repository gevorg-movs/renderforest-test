import {
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    IsUUID,
    Model,
    Table,
} from 'sequelize-typescript'
import { Image } from '../images/image.entity'
import { Tag } from '../tags/tag.entity'
import { AnnouncementTag } from './announcementTag.entity'
import { City } from '../cities/city.entity'
import { Region } from '../regions/region.entity'
import { Category } from '../categories/category.entity'
import { User } from '../users/user.entity'

@Table
export class Announcement extends Model {
    @IsUUID(4)
    @Column({
        primaryKey: true,
        autoIncrementIdentity: true,
        autoIncrement: true,
    })
    id: number

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number

    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    categoryId: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string

    @Column({
        type: new DataType.STRING(1000),
        allowNull: false,
    })
    description: string

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    price: number

    @ForeignKey(() => Region)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    regionId: number

    @ForeignKey(() => City)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    cityId: number

    @HasMany(() => Image)
    images: Image[]

    @BelongsToMany(() => Tag, () => AnnouncementTag)
    tags: Tag[]

    @BelongsTo(() => City)
    city: City

    @BelongsTo(() => Region)
    region: Region

    @BelongsTo(() => Category)
    category: Category
}
