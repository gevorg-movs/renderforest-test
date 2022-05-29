import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './contants'
import { JwtStrategy } from './auth.jwt.strategy'
import { UsersModule } from '../users/users.module'

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, UsersModule],
    imports: [
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expiresIn },
        }),
        UsersModule,
    ],
    exports: [AuthService],
})
export class AuthModule {}
