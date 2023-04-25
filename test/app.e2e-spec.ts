import { ValidationPipe, Post } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { NestApplication } from '@nestjs/core';
import * as pactum from 'pactum'
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { EditUserDto } from 'src/user/dto/edit-user.dto';

describe('App e2e', () => {
  let app: NestApplication
  let prisma : PrismaService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      })
    )

    await app.init()
    await app.listen(3001)

    prisma = app.get(PrismaService)
    await prisma.cleanDb()
    pactum.request.setBaseUrl('http://localhost:3001')
  })


  afterAll(() => {
    app.close()
  })

  describe('Auth',  () => {

    // Signup Testing
    describe('Signup', () => {
      it('should signup', () => {
        const dto: AuthDto = {
          email: "am@gmail.com",
         password: "password" 
        }

        return pactum.spec().post('/auth/signup')
        .withBody(dto)
        .expectStatus(201)
      })

      it('Throw Error when email is empty', () => {
        const dto = {
          password: "password" 
        }

        return pactum.spec().post('/auth/signup')
        .withBody(dto)
        .expectStatus(400)
      })

      it('Throw Error when password is empty', () => {
        const dto = {
          email: "am@gmail.com" 
        }

        return pactum.spec().post('/auth/signup')
        .withBody(dto)
        .expectStatus(400)
      })

      it('Throw Error if no body provided', () => {
        return pactum.spec().post('/auth/signup')
        .expectStatus(400)
      })
    })

    // Signin Testing
    describe('Signin', () => {
      it('Throw Error when Password is incorrect', () => {
        // Incorrect Password
        const dto: AuthDto = {
          email: 'am@gmail.com',
          password: 'passwor'
        }
  
        return pactum.spec().post('/auth/signin')
        .withBody(dto)
        .expectStatus(403)
      })

      it('Throw Error when Email is incorrect', () => {
        // Incorrect Password
        const dto: AuthDto = {
          email: 'a@gmail.com',
          password: 'password'
        }
  
        return pactum.spec().post('/auth/signin')
        .withBody(dto)
        .expectStatus(403)
      })

      it('Throw Error no body provided', () => {
        return pactum.spec().post('/auth/signin')
        .expectStatus(400)
      })

      it('Should signin', () => {
        const dto: AuthDto = {
          email: 'am@gmail.com',
          password: 'password'
        }

        return pactum.spec().post('/auth/signin')
        .withBody(dto)
        .expectStatus(200)
        .stores('userAt', 'access_token')
      })
    })
  })


  describe('User', () => {
    describe('Get me',  () => {
      it('Should get Current User', () => {
        return pactum
        .spec()
        .get('/users/me')
        .withHeaders({
          Authorization: `Bearer $S{userAt}`
        })
        .expectStatus(200)
      })
    })

    describe('Edit User', () => {
      it('Should Edit User By Id ', () => {
        const dto: EditUserDto = {
          firstName: 'Muhamad Farhan',
          email: "han@gmail.com"
        }
        return pactum
        .spec()
        .patch('/users')
        .withHeaders({
          Authorization: `Bearer $S{userAt}`
        })
        .withBody(dto)
        .expectStatus(200)
      })
    })
    
    
  })

  describe('Bookmark', () => {
    describe('Create Bookmarks', () => {

    })

    describe('Get Bookmarks', () => {

    })

    describe('Delete Bookmark By Id', () => {

    })

    describe('Edit Bookmark By Id', () => {

    })

    describe('Delete Bookmark By Id', () => {

    })
  })

})



// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from './../src/app.module';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });
// });
