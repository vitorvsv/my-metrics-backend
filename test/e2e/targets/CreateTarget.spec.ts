import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppTestingModule } from '../../../src/app-testing.module';

describe('Target', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppTestingModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Should create a target calling POST /targets route', async () => {
        const accountInput = {
            name: 'John Doe',
            email: 'john@doe.com',
            username: 'johndoe',
            password: 'Teste@123456',
        };
        await request(app.getHttpServer())
            .post('/accounts')
            .send(accountInput)
            .expect(201)
            .then(async (createAccountRes) => {
                const accountId = createAccountRes?.body?.accountId || '';
                await request(app.getHttpServer())
                    .post(`/targets`)
                    .send({
                        description: 'Estudar inglês',
                        frequency: 'monthly',
                        value: 17,
                        startDate: '2025-01-01T03:00:00.000Z',
                        endDate: '2025-12-31T03:00:00.000Z',
                        status: 'active',
                        accountId: accountId,
                    })
                    .expect(201)
                    .then((targetResponse) => {
                        expect(targetResponse.body.targetId).toBeDefined();
                    });
            });
    });
});
