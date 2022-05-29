import { Image } from './image.entity'

export const ImagesProviders = [
    {
        provide: 'IMAGES_REPOSITORY',
        useValue: Image,
    },
]
