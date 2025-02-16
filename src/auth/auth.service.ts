import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
    @Inject()
    private readonly prisma: PrismaService;
    @Inject()
    private readonly userService: UserService;
    @Inject()
    private readonly jwtService: JwtService;

    async singin(params: Prisma.UserCreateInput,
    // ): Promise<Omit<User, 'password'>> {
    ): Promise<{ access_token: string }> {
        // const user = await this.userService.user({ email: params.email });
        const user = await this.prisma.user.findUnique({ 
            where: {email: params.email}
         });
        if (!user) throw new NotFoundException('User not found');
        const passwordMatch = await bcrypt.compare(params.password, user.password);
        if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

        const payload = { sub: user.id } //retorna no token apenas o id do usuario no payload
        // const { password, ...result } = user;
       // return result;
       return { access_token: await this.jwtService.signAsync(payload) };
    }
}
