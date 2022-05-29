import { HttpException, Inject, Injectable } from '@nestjs/common'
import { AuthRegisterDto } from './dto/auth-register.dto'
import * as bcrypt from 'bcrypt'
import { AuthLoginDto } from './dto/auth-login.dto'
import { JwtService } from '@nestjs/jwt'
import { User } from '../users/user.entity'

@Injectable()
export class AuthService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private usersRepository: typeof User,
        private jwtService: JwtService,
    ) {}

    async register(registerDto: AuthRegisterDto): Promise<any> {
        const userWithEmail = await this.usersRepository.findOne({
            where: { email: registerDto.email },
        })

        if (userWithEmail) {
            throw new HttpException(
                {
                    code: 'email-already-in-use',
                },
                400,
            )
        }

        const passwordHash = await bcrypt.hash(registerDto.password, 10)

        const user = await this.usersRepository.create({
            email: registerDto.email,
            name: registerDto.name,
            password: passwordHash,
        })

        const accessToken = await this.createToken(user)

        return {
            user,
            accessToken,
        }
    }

    async login(loginDto: AuthLoginDto): Promise<any> {
        const user = await this.usersRepository.findOne({
            where: { email: loginDto.email },
        })

        if (!user) {
            throw new HttpException(
                {
                    code: 'user-not-found',
                },
                400,
            )
        }

        const isMatch = await bcrypt.compare(loginDto.password, user.password)

        if (!isMatch) {
            throw new HttpException(
                {
                    code: 'wrong-password',
                },
                400,
            )
        }

        const accessToken = await this.createToken(user)

        return {
            user,
            accessToken,
        }
    }

    async createToken(user: User) {
        const payload = { email: user.email, id: user.id }

        return this.jwtService.sign(payload)
    }
}
