import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    @Inject()
    private readonly authService: AuthService;

    @Post('singin')
    singin(@Body() body: Prisma.UserCreateInput) {
        return this.authService.singin(body);
    }
}
