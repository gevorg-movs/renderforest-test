import { Category } from './category.entity'

export const CategoriesProviders = [
    {
        provide: 'CATEGORIES_REPOSITORY',
        useValue: Category,
    },
]
