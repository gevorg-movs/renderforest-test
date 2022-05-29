import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript'
import { Announcement } from './announcement.entity'
import { Tag } from '../tags/tag.entity'

@Table({
    timestamps: false,
})
export class AnnouncementTag extends Model {
    @ForeignKey(() => Announcement)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    announcementId: number

    @ForeignKey(() => Tag)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    tagId: number
}
