import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../../../src/app.module';

describe('Create Achievement', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Should return create an achievement when calling POST /achievements route', async () => {
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
        const targetResponse = await request(app.getHttpServer())
            .post(`/targets`)
            .send(targetInput)
            .expect(201);
        const targetId =
            (targetResponse.body as { targetId: string })?.targetId || '';
        const achievementInput = {
            value: 7,
            month: 1,
        };
        await request(app.getHttpServer())
            .post('/achievements')
            .send({
                value: achievementInput.value,
                month: achievementInput.month,
                targetId: targetId,
            })
            .then((response) => {
                expect(response?.body?.achievementId).toBeDefined();
            })
            .catch((error) => {
                console.log(error);
            });
    });
});
