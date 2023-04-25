import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator/get-user.docrarator';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {

  @UseGuards(JwtGuard)
  @Get('me')
  async getCurrentUser(@GetUser() user: User) {
    return user
  }
}
