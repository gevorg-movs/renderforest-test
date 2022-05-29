import { Controller, Get, Param, Query } from '@nestjs/common'
import { CitiesService } from './cities.service'

@Controller('cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) {}

    @Get()
    async findAll(@Query() params) {
        return await this.citiesService.findAll(params)
    }

    @Get(':cityId')
    async findOne(@Param('cityId') cityId: number) {
        return await this.citiesService.findOne(cityId)
    }
}
