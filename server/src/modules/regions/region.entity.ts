import {
    Column,
    DataType,
    HasMany,
    IsUUID,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'
import { Announcement } from '../announcements/announcement.entity'

@Table
export class Region extends Model {
    @IsUUID(4)
    @PrimaryKey
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
