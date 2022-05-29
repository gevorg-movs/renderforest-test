import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    IsUUID,
    Model,
    Table,
} from 'sequelize-typescript'
import { Announcement } from '../announcements/announcement.entity'

@Table
export class Image extends Model {
    @IsUUID(4)
    @Column({
        primaryKey: true,
        autoIncrementIdentity: true,
        autoIncrement: true,
    })
    id: number

    @ForeignKey(() => Announcement)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    announcementId: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    src: string

    @BelongsTo(() => Announcement)
    announcement: Announcement
}
