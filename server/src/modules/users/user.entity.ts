import { Column, DataType, IsUUID, Model, Table } from 'sequelize-typescript'

@Table
export class User extends Model {
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

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string
}
