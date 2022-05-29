import { Module } from '@nestjs/common'
import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'
import { Category } from './category.entity'
import { CategoriesProviders } from './categories.providers'

@Module({
    controllers: [CategoriesController],
    providers: [CategoriesService, ...CategoriesProviders],
    imports: [Category],
    exports: [CategoriesService, Category, ...CategoriesProviders],
})
export class CategoriesModule {}
