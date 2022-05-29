import { Inject, Injectable } from '@nestjs/common'
import { Region } from './region.entity'

@Injectable()
export class RegionsService {
    constructor(
        @Inject('REGIONS_REPOSITORY')
        private regionsRepository: typeof Region,
    ) {}

    async findAll(): Promise<Region[]> {
        return this.regionsRepository.findAll()
    }

    async findOne(regionId: number): Promise<Region> {
        return this.regionsRepository.findByPk(regionId)
    }
}
