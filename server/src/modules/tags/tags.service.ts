import { Inject, Injectable } from '@nestjs/common'
import { Tag } from './tag.entity'

@Injectable()
export class TagsService {
    constructor(
        @Inject('TAGS_REPOSITORY')
        private tagsRepository: typeof Tag,
    ) {}

    async findAll(): Promise<Tag[]> {
        return this.tagsRepository.findAll()
    }
}
