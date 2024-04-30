import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { secret } from 'src/user/constants/constants';
import { JwtPayload } from './jwt.payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload) {
   
    const isTokenExpired = this.isTokenExpired(payload);
    if (isTokenExpired) {
      console.log('Token is expired');
      throw new UnauthorizedException('Token is expired, login again');
    }
   return { id: payload.id, username: payload.username};
  }

  private isTokenExpired(payload: JwtPayload): boolean {
    return false; 
  }
}