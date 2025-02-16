import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    @Inject()
    private readonly authService: AuthService;

    @Post('singin')
    @HttpCode(HttpStatus.OK)
    singin(@Body() body: Prisma.UserCreateInput) {
        return this.authService.singin(body);
    }
}
