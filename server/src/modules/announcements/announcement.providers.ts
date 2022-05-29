import { Announcement } from './announcement.entity'

export const AnnouncementProviders = [
    {
        provide: 'ANNOUNCEMENTS_REPOSITORY',
        useValue: Announcement,
    },
]
