import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { City } from './city.entity'
import { WhereOptions } from 'sequelize'

@Injectable()
export class CitiesService {
    constructor(
        @Inject('CITIES_REPOSITORY')
        private citiesRepository: typeof City,
    ) {}

    async findAll(params): Promise<City[]> {
        const { regionId } = params
        const where: WhereOptions = {}

        if (regionId) {
            where.regionId = regionId
        }

        return this.citiesRepository.findAll({ where })
    }

    async findOne(cityId: number): Promise<City> {
        return this.citiesRepository.findByPk(cityId)
    }

    async checkIfCityBelongsToRegion(cityId: number, regionId: number) {
        const city = await this.citiesRepository.findByPk(cityId)

        if (regionId != city.regionId) {
            throw new ForbiddenException({
                message: 'Invalid city',
            })
        }
    }
}
