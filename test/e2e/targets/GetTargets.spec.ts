import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppTestingModule } from '../../../src/app-testing.module';

describe('Get Targets', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppTestingModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Should return all targets when calling GET /targets route', async () => {
        const accountResponse = await request(app.getHttpServer())
            .post('/accounts')
            .send({
                name: 'John Doe',
                email: 'john@doe.com',
                username: 'johndoe',
                password: 'Teste@123456',
            })
            .expect(201);
        const accountId =
            (accountResponse.body as { accountId: string })?.accountId || '';
        const targetInput = {
            description: 'Estudar inglês',
            frequency: 'monthly',
            value: 17,
            startDate: '2025-01-01T03:00:00.000Z',
            endDate: '2025-12-31T03:00:00.000Z',
            status: 'active',
            accountId: accountId,
        };
        await request(app.getHttpServer())
            .post(`/targets`)
            .send(targetInput)
            .expect(201);
        await request(app.getHttpServer())
            .get('/targets')
            .query({
                limit: '1',
                offset: 0,
            })
            .send({
                accountId: accountId,
            })
            .then((response) => {
                expect(response?.body?.targets).toBeDefined();
                expect(response?.body?.targets).toHaveLength(1);
                expect(response?.body?.targets[0]?.targetId).toBeDefined();
                expect(response?.body?.targets[0]?.description).toBe(
                    targetInput.description,
                );
                expect(response?.body?.targets[0]?.value).toBe(
                    targetInput.value,
                );
            });
    });
});
