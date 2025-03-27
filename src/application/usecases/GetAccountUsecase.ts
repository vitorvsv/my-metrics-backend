import { AccountEntity } from '../../domain/entities/AccountEntity';
import { AccountRepository } from '../../infra/repositories/AccountRepository';

export class GetAccountUseCase {
    constructor(private accountRepository: AccountRepository) {}

    async execute(accountId: string): Promise<Output> {
        const account: AccountEntity | null =
            await this.accountRepository.getAccountById(accountId);
        return {
            accountId: account?.getAccountId().getValue() || '',
            name: account?.getName().getValue() || '',
            email: account?.getEmail().getValue() || '',
            username: account?.getUsername().getValue() || '',
        };
    }
}

type Output = {
    accountId: string;
    name: string;
    email: string;
    username: string;
};
