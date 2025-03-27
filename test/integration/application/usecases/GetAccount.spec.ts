import * as crypto from 'crypto';
import { DataSource } from 'typeorm';
import { SignupUseCase } from '../../../../src/application/usecases/SignupUsecase';
import {
    AccountRepository,
    AccountRepositoryDatabase,
} from '../../../../src/infra/repositories/AccountRepository';
import { GetAccountUseCase } from '../../../../src/application/usecases/GetAccountUsecase';

let datasource: DataSource;
let accountRepository: AccountRepository;
let signupUseCase: SignupUseCase;
let getAccountUseCase: GetAccountUseCase;

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
    getAccountUseCase = new GetAccountUseCase(accountRepository);
});

describe('Get account test suite', () => {
    it('Should return an account', async () => {
        const input = {
            name: 'Joe Doe',
            email: `joedoe-${crypto.randomUUID()}@gmail.com`,
            username: `joedoe-${crypto.randomUUID()}`,
            password: 'Teste@123456',
        };
        const account = await signupUseCase.execute(input);
        const accountId = account.accountId;
        const accountFound = await getAccountUseCase.execute(accountId);
        expect(accountFound.accountId).toBe(accountId);
        expect(accountFound.name).toBe(input.name);
        expect(accountFound.email).toBe(input.email);
        expect(accountFound.username).toBe(input.username);
    });
});
