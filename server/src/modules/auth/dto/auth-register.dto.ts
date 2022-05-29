import { IsEmail, IsString } from 'class-validator'

export class AuthRegisterDto {
    @IsEmail()
    email: string

    @IsString()
    name: string

    @IsString()
    password: string

    @IsString()
    passwordConfirmation: string
}
