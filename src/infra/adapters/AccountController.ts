import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SignupUseCase } from '../../application/usecases/SignupUsecase';
import { GetAccountUseCase } from '../../application/usecases/GetAccountUsecase';
import { AccountRepositoryDatabase } from '../repositories/AccountRepository';

@Controller('accounts')
export class AccountController {
    constructor(private datasource: DataSource) {}

    @Post()
    async createAccount(@Body() body: Input): Promise<any> {
        const accountRepository = new AccountRepositoryDatabase(
            this.datasource,
        );
        const signupUseCase = new SignupUseCase(accountRepository);
        const account = await signupUseCase.execute(body);
        return {
            accountId: account.accountId,
        };
    }

    @Get(':accountId')
    async getAccount(@Param('accountId') accountId: string): Promise<Output> {
        const accountRepository = new AccountRepositoryDatabase(
            this.datasource,
        );
        const getAccountUseCase = new GetAccountUseCase(accountRepository);
        const accountData = await getAccountUseCase.execute(accountId);
        return {
            accountId: accountData.accountId,
            name: accountData.name,
            email: accountData.email,
            username: accountData.username,
        };
    }
}

type Input = {
    name: string;
    email: string;
    username: string;
    password: string;
};

type Output = {
    accountId: string;
    name: string;
    email: string;
    username: string;
};
