import { extname } from 'path'
import { Request } from 'express'

export class AnnouncementsHelpers {
    static generateImageRandomName(
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, filename: string) => void,
    ) {
        const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('')
        return cb(null, `${randomName}${extname(file.originalname)}`)
    }
}
