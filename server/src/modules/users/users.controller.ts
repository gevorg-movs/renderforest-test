import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AnnouncementsService } from '../announcements/announcements.service'
import { JwtAuthGuard } from '../auth/auth.jwt-auth.guard'

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly announcementsService: AnnouncementsService) {}

    @Get('myAnnouncements')
    async findAll(@Req() { user }) {
        return await this.announcementsService.findAll({ userId: user.id })
    }
}
