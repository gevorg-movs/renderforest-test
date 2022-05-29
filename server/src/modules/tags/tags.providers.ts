import { Tag } from './tag.entity'

export const TagsProviders = [
    {
        provide: 'TAGS_REPOSITORY',
        useValue: Tag,
    },
]
