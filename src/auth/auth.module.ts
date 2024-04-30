import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from 'src/authguard/jwt.strategy';

@Module({
  imports: [JwtModule, UserModule],
  providers: [JwtService, AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
