import {
    BelongsToMany,
    Column,
    DataType,
    IsUUID,
    Model,
    Table,
} from 'sequelize-typescript'
import { AnnouncementTag } from '../announcements/announcementTag.entity'
import { Announcement } from '../announcements/announcement.entity'

@Table
export class Tag extends Model {
    @IsUUID(4)
    @Column({
        primaryKey: true,
        autoIncrementIdentity: true,
        autoIncrement: true,
    })
    id: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string

    @BelongsToMany(() => Announcement, () => AnnouncementTag)
    announcements: Announcement[]
}
