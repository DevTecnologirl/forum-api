import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject()
  private readonly jwtService: JwtService;

  canActivate(
    context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = this.extractTokenFromHeader(request)
    if (!authorization) throw new UnauthorizedException('Token é requerido');

    try{
      const payload = this.jwtService.verify(authorization, { secret: process.env.SECRET_KEY,} );
      request['sub'] = payload;
    } catch (error) {
      throw new UnauthorizedException('Token Inválido')
    }
    return Promise.resolve(true);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  //RETORNO: split => [Bearer, vfjdfjfk token] 
}
