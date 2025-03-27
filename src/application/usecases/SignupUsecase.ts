import { AccountEntity } from '../../domain/entities/AccountEntity';

import { AccountRepository } from '../../infra/repositories/AccountRepository';

export class SignupUseCase {
    constructor(private accountRepository: AccountRepository) {}

    async execute(input: Input) {
        const account = AccountEntity.create(
            input.name,
            input.email,
            input.username,
            input.password,
        );
        const createdAccount =
            await this.accountRepository.createAccount(account);
        return {
            accountId: createdAccount.getAccountId().getValue(),
        };
    }
}

type Input = {
    name: string;
    email: string;
    username: string;
    password: string;
};
