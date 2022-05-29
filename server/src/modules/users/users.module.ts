import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User } from './user.entity'
import { UsersProviders } from './users.providers'
import { AnnouncementsModule } from '../announcements/announcements.module'

@Module({
    controllers: [UsersController],
    providers: [UsersService, ...UsersProviders],
    imports: [User, AnnouncementsModule],
    exports: [User, UsersService, ...UsersProviders],
})
export class UsersModule {}
