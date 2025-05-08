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

    it('Should get an account calling POST /accounts/:id route', async () => {
        const input = {
            name: 'John Doe',
            email: 'john@doe.com',
            username: 'johndoe',
            password: 'Teste@123456',
        };
        await request(app.getHttpServer())
            .post('/accounts')
            .send(input)
            .expect(201)
            .then(async (createAccountRes) => {
                const accountId = createAccountRes?.body?.accountId || '';
                await request(app.getHttpServer())
                    .get(`/accounts/${accountId}`)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.name).toEqual(input.name);
                        expect(response.body.email).toEqual(input.email);
                        expect(response.body.username).toEqual(input.username);
                        expect(response.body.password).toBeUndefined();
                    });
            });
    });
});
