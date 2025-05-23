import * as crypto from 'crypto';
import { DataSource } from 'typeorm';
import { SignupUseCase } from '@application/usecases/SignupUseCase';
import {
    AccountRepository,
    AccountRepositoryDatabase,
} from '@infra/repositories/AccountRepository';
import CreateTargetUseCase from '@application/usecases/CreateTargetUseCase';
import {
    TargetRepository,
    TargetRepositoryDatabase,
} from '@infra/repositories/TargetRepository';
import CreateAchievementUseCase from '@application/usecases/CreateAchievementUseCase';
import { UUIDVO } from '@domain/vo/UUIDVO';
import {
    AchievementRepository,
    AchievementRepositoryDatabase,
} from '@infra/repositories/AchievementRepository';

let datasource: DataSource;
let accountRepository: AccountRepository;
let signupUseCase: SignupUseCase;
let targetRepositoryDatabase: TargetRepository;
let createTargetUseCase: CreateTargetUseCase;
let achievementRepository: AchievementRepository;
let createAchievementUseCase: CreateAchievementUseCase;

beforeAll(async () => {
    datasource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123456',
        database: 'app',
        entities: [],
        synchronize: true,
    });
    await datasource.initialize();
    accountRepository = new AccountRepositoryDatabase(datasource);
    signupUseCase = new SignupUseCase(accountRepository);
    targetRepositoryDatabase = new TargetRepositoryDatabase(datasource);
    createTargetUseCase = new CreateTargetUseCase(targetRepositoryDatabase);
    achievementRepository = new AchievementRepositoryDatabase(datasource);
    createAchievementUseCase = new CreateAchievementUseCase(
        achievementRepository,
        targetRepositoryDatabase,
    );
});

describe('Create achievement test suite', () => {
    it('Should create a month achievement related to a target', async () => {
        const accountInput = {
            name: 'Joe Doe',
            email: `joedoe-${crypto.randomUUID()}@gmail.com`,
            username: `joedoe-${crypto.randomUUID()}`,
            password: 'Teste@123456',
        };
        const account = await signupUseCase.execute(accountInput);
        const targetInput = {
            description: 'Estudar inglês',
            frequency: 'monthly',
            value: 17,
            startDate: '2025-01-01T03:00:00.000Z',
            endDate: '2025-12-31T03:00:00.000Z',
            status: 'active',
            accountId: account.accountId,
        };
        const target = await createTargetUseCase.execute(targetInput);
        const achievementInput = {
            month: 1,
            value: 7,
            targetId: target.targetId,
        };
        const achievement =
            await createAchievementUseCase.execute(achievementInput);
        expect(achievement?.achievementId).toBeDefined();
    });

    it('Should not create a month achievement with a non created target', async () => {
        const achievementInput = {
            month: 1,
            value: 7,
            targetId: UUIDVO.create().getValue(),
        };
        await expect(() =>
            createAchievementUseCase.execute(achievementInput),
        ).rejects.toThrow('Target not found');
    });
});
