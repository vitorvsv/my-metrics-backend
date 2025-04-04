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
            password: account?.getPassword().getCiphertext() || '',
            iv: account?.getPassword().getIv() || '',
            tag: account?.getPassword().getTag() || Buffer.from(''),
        };
    }
}

type Output = {
    accountId: string;
    name: string;
    email: string;
    username: string;
    password: string;
    iv: string;
    tag: Buffer;
};
