import { Module } from '@nestjs/common'
import { RegionsController } from './regions.controller'
import { RegionsService } from './regions.service'
import { Region } from './region.entity'
import { RegionsProviders } from './regions.providers'

@Module({
    controllers: [RegionsController],
    providers: [RegionsService, ...RegionsProviders],
    imports: [Region],
    exports: [RegionsService, Region, ...RegionsProviders],
})
export class RegionsModule {}
