import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    return this.authService.signUp(dto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() dto: AuthDto) {
    return this.authService.signIn(dto)
  }


}