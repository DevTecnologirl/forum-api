import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async signupUser(
        @Body(new ValidationPipe) createUserDto: CreateUserDto, // OU Prisma.UserCreateInput OU email: string; password: string
    ): Promise<UserModel> {
        return this.userService.createUser(createUserDto);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number ): Promise<Omit<UserModel, 'password'> | null> {
        return this.userService.user({ id });
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async updateUser(
        @Body(new ValidationPipe) userData: UpdateUserDto,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<UserModel> {
        return this.userService.updateUser({
        where: { id },
        data: userData,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.userService.deleteUser({ id })
  }
}
