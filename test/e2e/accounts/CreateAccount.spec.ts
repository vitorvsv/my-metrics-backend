import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../../../src/app.module';

describe('Accounts', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Should create an account calling POST /accounts route', async () => {
        return request(app.getHttpServer())
            .post('/accounts')
            .send({
                name: 'John Doe',
                email: 'john@doe.com',
                username: 'johndoe',
                password: 'Teste@123456',
            })
            .expect(201);
    });
});
