import * as crypto from 'crypto';
import { DataSource } from 'typeorm';
import { SignupUseCase } from '@application/usecases/SignupUseCase';
import CreateTargetUseCase from '@application/usecases/CreateTargetUseCase';
import {
    AccountRepository,
    AccountRepositoryDatabase,
} from '@infra/repositories/AccountRepository';
import {
    TargetRepository,
    TargetRepositoryDatabase,
} from '@infra/repositories/TargetRepository';
import GetTargetsUseCase from '@application/usecases/GetTargetsUseCase';

let datasource: DataSource;
let accountRepository: AccountRepository;
let signupUseCase: SignupUseCase;
let targetRepositoryDatabase: TargetRepository;
let createTargetUseCase: CreateTargetUseCase;
let getTargetsUseCase: GetTargetsUseCase;

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
    getTargetsUseCase = new GetTargetsUseCase(targetRepositoryDatabase);
});

describe('Get targets test suite', () => {
    it('Should return two targets', async () => {
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
        await createTargetUseCase.execute(targetInput);
        await createTargetUseCase.execute({
            ...targetInput,
            description: 'Estudar inglês 2',
        });
        const getTargetsInput = {
            accountId: account.accountId,
            limit: 10,
            offset: 0,
        };
        const targets = await getTargetsUseCase.execute(getTargetsInput);
        expect(targets).toBeInstanceOf(Array);
        expect(targets).toHaveLength(2);
        expect(targets[0].getDescription()).toBe(targetInput.description);
        expect(targets[0].getValue()).toBe(targetInput.value);
    });

    it('Should match description with second target with limit 1 and offset 1 and ', async () => {
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
        await createTargetUseCase.execute(targetInput);
        const targetInput2 = {
            ...targetInput,
            description: 'Estudar inglês 2',
        };
        await createTargetUseCase.execute(targetInput2);
        const getTargetsInput = {
            accountId: account.accountId,
            limit: 1,
            offset: 1,
        };
        const targets = await getTargetsUseCase.execute(getTargetsInput);
        expect(targets).toBeInstanceOf(Array);
        expect(targets).toHaveLength(1);
        expect(targets[0].getDescription()).toBe(targetInput2.description);
    });
});
