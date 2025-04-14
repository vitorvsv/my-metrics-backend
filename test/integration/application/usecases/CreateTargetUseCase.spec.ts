import * as crypto from 'crypto';
import { DataSource } from 'typeorm';
import { SignupUseCase } from '../../../../src/application/usecases/SignupUseCase';
import {
    AccountRepository,
    AccountRepositoryDatabase,
} from '../../../../src/infra/repositories/AccountRepository';
import CreateTargetUseCase from '../../../../src/application/usecases/CreateTargetUseCase';
import {
    TargetRepository,
    TargetRepositoryDatabase,
} from '../../../../src/infra/repositories/TargetRepository';

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
            startDate: new Date(2025, 0, 1),
            endDate: new Date(2025, 11, 31),
            status: 'active',
            accountId: account.accountId,
        };
        const target = await createTargetUseCase.execute(targetInput);
        expect(target.targetId).toBeDefined();
    });
});
