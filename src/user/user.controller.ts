import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator/get-user.docrarator';
import { JwtGuard } from '../auth/guard';

@Controller('users')
export class UserController {

  @UseGuards(JwtGuard)
  @Get('me')
  async getCurrentUser(@GetUser() user: User) {
    return user
  }
}
