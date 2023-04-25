import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(
    userId: number, 
    dto: EditUserDto
  ) {

    const user = await this.prisma.user.update({
      where: {
        id: userId
      },
      data: dto, 
    })
    
    if(!user) throw new NotFoundException('User not found!')

    delete user.hash 

    return user
  }
}
