import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from './auth.service'
import { AuthRegisterDto } from './dto/auth-register.dto'
import { AuthLoginDto } from './dto/auth-login.dto'
import { User } from '../users/user.entity'
import { UsersService } from "../users/users.service";
import { JwtAuthGuard } from "./auth.jwt-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly usersService: UsersService
                ) {}

    @Post('/register')
    async register(@Body() authRegisterDto: AuthRegisterDto): Promise<User> {
        return await this.authService.register(authRegisterDto)
    }


    @Get('/getCurrentUser')
    @UseGuards(JwtAuthGuard)
    async getCurrentUser(@Req() {user}): Promise<User> {
        return await this.usersService.getById(user.id)
    }

    @Post('/login')
    async login(@Body() authLoginDto: AuthLoginDto): Promise<User> {
        return await this.authService.login(authLoginDto)
    }
}
