import * as crypto from 'crypto';
import { DataSource } from 'typeorm';
import { SignupUseCase } from '../../../../src/application/usecases/SignupUsecase';
import {
    AccountRepository,
    AccountRepositoryDatabase,
} from '../../../../src/infra/repositories/AccountRepository';

let datasource: DataSource;
let accountRepository: AccountRepository;
let signupUseCase: SignupUseCase;

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
});

describe('Signup test suite', () => {
    it('Should register a new account', async () => {
        const input = {
            name: 'Joe Doe',
            email: `joedoe-${crypto.randomUUID()}@gmail.com`,
            username: `joedoe-${crypto.randomUUID()}`,
            password: 'Teste@123456',
        };
        const account = await signupUseCase.execute(input);
        expect(account.accountId).toBeDefined();
    });
});
