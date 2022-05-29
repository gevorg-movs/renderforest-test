import { Module } from '@nestjs/common'
import { CitiesController } from './cities.controller'
import { CitiesService } from './cities.service'
import { City } from './city.entity'
import { CitiesProviders } from './cities.providers'

@Module({
    controllers: [CitiesController],
    providers: [CitiesService, ...CitiesProviders],
    imports: [City],
    exports: [CitiesService, City, ...CitiesProviders],
})
export class CitiesModule {}
