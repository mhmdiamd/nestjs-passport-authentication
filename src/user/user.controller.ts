import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator/get-user.docrarator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto/edit-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

  constructor(
    private userService: UserService
  ){}

  // User Guard is like middleware, which is data will be filtering first before be parameter
  @UseGuards(JwtGuard)
  @Get('me')
  async getCurrentUser(@GetUser() user: User) {
    return user
  }
  
  @UseGuards(JwtGuard)
  @Patch()
  editUser(
    @GetUser('id') userId: number,
    @Body() dto: EditUserDto
  ){
    console.log(userId)
    return this.userService.editUser(userId, dto)
  }
}
