import { IsInt, IsString } from 'class-validator'
import { Type } from 'class-transformer'
import DoesExist from "../../../validations/DoesExist";
import { Category } from "../../categories/category.entity";
import { Region } from "../../regions/region.entity";
import { City } from "../../cities/city.entity";

export class CreateAnnouncementDto {
    @IsString()
    title: string

    @IsString()
    description: string

    @Type(() => Number)
    @IsInt()
    @DoesExist({ model: Category, field: 'id' })
    categoryId: number

    @Type(() => Number)
    @IsInt()
    price: number

    @Type(() => Number)
    @IsInt()
    @DoesExist({ model: Region, field: 'id' })
    @DoesExist({ model: City, field: 'regionId' })
    regionId: number

    @Type(() => Number)
    @IsInt()
    @DoesExist({ model: City, field: 'id' })
    cityId: number

    tagIds: number[]
}
