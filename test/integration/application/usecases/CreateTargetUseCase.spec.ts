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

let datasource: DataSource;
let accountRepository: AccountRepository;
let signupUseCase: SignupUseCase;
let targetRepositoryDatabase: TargetRepository;
let createTargetUseCase: CreateTargetUseCase;

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
});

describe('Create target test suite', () => {
    it('Should create a target', async () => {
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
        expect(target.targetId).toBeDefined();
    });
});
