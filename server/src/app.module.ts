import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AnnouncementsModule } from './modules/announcements/announcements.module'
import { UsersModule } from './modules/users/users.module'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { CitiesModule } from './modules/cities/cities.module'
import { ImagesModule } from './modules/images/images.module'
import { RegionsModule } from './modules/regions/regions.module'
import { TagsModule } from './modules/tags/tags.module'
import { CategoriesModule } from './modules/categories/categories.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

const config = ConfigModule.forRoot({
    envFilePath: '.env',
})

@Module({
    imports: [
        config,
        AuthModule,
        DatabaseModule,
        UsersModule,
        AnnouncementsModule,
        RegionsModule,
        ImagesModule,
        TagsModule,
        CitiesModule,
        CategoriesModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'), // added ../ to get one folder back
            serveRoot: '/public/', //last slash was important
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
