import { City } from './city.entity'

export const CitiesProviders = [
    {
        provide: 'CITIES_REPOSITORY',
        useValue: City,
    },
]
