import { Region } from './region.entity'

export const RegionsProviders = [
    {
        provide: 'REGIONS_REPOSITORY',
        useValue: Region,
    },
]
