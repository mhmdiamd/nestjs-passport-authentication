import { Injectable, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto/auth.dto";
import * as argon from "argon2";
import { Prisma } from "@prisma/client";
import { JwtService } from "@nestjs/jwt/dist";
import { ConfigService } from "@nestjs/config/dist/config.service";

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) { }

  async signUp(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password)
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash
        }
      })

      delete user.hash

      // Return the saved user
      return user
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken!')
        }
      }
      throw error
    }
  }

  async signIn(dto: AuthDto) {

    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      }
    })

    // Throw error when user not found
    if (!user) {
      throw new ForbiddenException('Email incorrect!')
    }

    const pwMatches = await argon.verify(user.hash, dto.password)

    // Throw error when password not match
    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect!')
    }

    // return data when everything matches
    return await this.signToken(user.id, user.email)
  }

  async signToken(
    userId: number,
    email: string
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email
    }

    const secret = this.config.get('JWT_SECRET')

    // Sign Token
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret
    })

    return {
      access_token: token
    }
  }

}