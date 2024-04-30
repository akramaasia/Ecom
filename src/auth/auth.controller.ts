import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
  Get
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthGuard, Public } from 'src/authguard/auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtAuthGuard } from 'src/authguard/jwt.guard';
import { ContentValue } from './decorators/content.decorator';
import { Auth } from './decorators/auth.decorator';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  register(@Body() CreateUserDto: CreateUserDto): Promise<Partial<UserEntity>> {
    return this.authService.register(CreateUserDto);
  }

  @Public()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async signOut(@Request() req): Promise<string> {
    //console.log("value"+req);
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header

    const message = await this.authService.signOut(token);
    return message; // Return the success message
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Request() req: Request) 
  {
    console.log("status");
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('content')
  getContent(@ContentValue('content') ContentValue: number)
  {
    return ContentValue;
  }
  
  @Post('authtype')
  addType(@Auth( "type") type : string): CreateAuthDto
  {
    return type;
  }

}
