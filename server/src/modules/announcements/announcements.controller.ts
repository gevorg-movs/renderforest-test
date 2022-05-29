import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { AnnouncementsService } from './announcements.service'
import { JwtAuthGuard } from '../auth/auth.jwt-auth.guard'
import { CreateAnnouncementDto } from './dto/create-announcement.dto'
import { UpdateAnnouncementDto } from './dto/update-announcement.dto'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { ImagesService } from '../images/images.service'
import { AnnouncementsHelpers } from './announcements.helpers'

@Controller('announcements')
export class AnnouncementsController {
    constructor(
      private readonly announcementsService: AnnouncementsService,
      private readonly imagesService: ImagesService,
    ) {
    }

    @Get()
    async findAll(@Query() params) {
        return await this.announcementsService.findAll(params)
    }

    @Get(':announcementId')
    async findOne(
      @Req() { user },
      @Param('announcementId') announcementId: number,
    ) {
        return await this.announcementsService.findOne(announcementId)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
      FilesInterceptor('images', 100, {
          storage: diskStorage({
              destination: './public/images',
              filename: AnnouncementsHelpers.generateImageRandomName,
          }),
      }),
    )
    async create(
      @Req() { user },
      @Body() createAnnouncementDto: CreateAnnouncementDto,
      @UploadedFiles() images: Array<Express.Multer.File>,
    ) {
        const announcement = await this.announcementsService.create(
          user,
          createAnnouncementDto,
        )

        await Promise.all(
          images.map(image =>
            this.imagesService.create(announcement.id, image.path),
          ),
        )

        await this.announcementsService.addTags(
          announcement,
          createAnnouncementDto.tagIds,
        )

        return announcement
    }

    @Put(':announcementId')
    @UseGuards(JwtAuthGuard)
    async update(
      @Req() { user },
      @Param('announcementId') announcementId: number,
      @Body() updateAnnouncementDto: UpdateAnnouncementDto,
    ) {
        return await this.announcementsService.update(
          user,
          announcementId,
          updateAnnouncementDto,
        )
    }

    @Delete(':announcementId')
    @UseGuards(JwtAuthGuard)
    async delete(
      @Req() { user },
      @Param('announcementId') announcementId: number,
    ) {
        return await this.announcementsService.delete(user, announcementId)
    }
}
