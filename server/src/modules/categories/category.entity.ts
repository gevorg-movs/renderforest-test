import {
    Column,
    DataType,
    HasMany,
    IsUUID,
    Model,
    Table,
} from 'sequelize-typescript'
import { Announcement } from '../announcements/announcement.entity'

@Table
export class Category extends Model {
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

    @HasMany(() => Announcement)
    announcements: Announcement[]
}
