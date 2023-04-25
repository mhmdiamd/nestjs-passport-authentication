import { ValidationPipe, Post } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { NestApplication } from '@nestjs/core';
import * as pactum from 'pactum'
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto/auth.dto';

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
  })


  afterAll(() => {
    app.close()
  })

  describe('Auth',  () => {

    
    describe('Signup', () => {
      it('should signup', () => {
        const dto: AuthDto = {
          email: "am@gmail.com",
         password: "password" 
        }

        return pactum.spec().post('http://localhost:3000/auth/signup')
        .withBody(dto)
        .expectStatus(201)
      })
    })

    describe('Signin', () => {

    })

  })

  describe('User', () => {
    describe('Get Current user',  () => {

    })
  })

  describe('Bookmark', () => {
    describe('Create Bookmarks', () => {

    })

    describe('Get Bookmarks', () => {

    })

    describe('Delete Bookmark By Id', () => {

    })

    describe('Edit Bookmarks', () => {

    })

    describe('Delete Bookmarks', () => {

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
