import { Controller, Get, Param } from '@nestjs/common'
import { CategoriesService } from './categories.service'

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    async findAll() {
        return await this.categoriesService.findAll()
    }

    @Get(':categoryId')
    async findOne(@Param('categoryId') categoryId: number) {
        return await this.categoriesService.findOne(categoryId)
    }
}
