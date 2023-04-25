import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { NestApplication } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';

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

    prisma = app.get(PrismaService)
    await prisma.cleanDb()
  })


  afterAll(() => {
    app.close()
  })

  describe('Auth',  () => {
    describe('Signin', () => {

    })

    describe('Signup', () => {

    })
  })

  describe('User', () => {
    describe('Get Current user', async () => {

    })
  })

  describe('Bookmark', () => {
    describe('Create Bookmarks', async () => {

    })

    describe('Get Bookmarks', async () => {

    })

    describe('Delete Bookmark By Id', async () => {

    })

    describe('Edit Bookmarks', async () => {

    })

    describe('Delete Bookmarks', async () => {

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
