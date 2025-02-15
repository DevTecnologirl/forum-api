import { Body, Controller, Post } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('singup')
    async signupUser(
        @Body() userData: Prisma.UserCreateInput, // OU Prisma.UserCreateInput OU email: string; password: string
    ): Promise<UserModel> {
        return this.userService.createUser(userData);
    }
}
