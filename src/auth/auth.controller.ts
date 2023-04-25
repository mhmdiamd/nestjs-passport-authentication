import { AuthService } from './auth.service';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signin(@Body() dto: AuthDto) {
    return this.authService.signIn(dto)
  }

  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    return this.authService.signUp(dto)
  }

}