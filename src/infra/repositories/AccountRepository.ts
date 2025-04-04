import { DataSource } from 'typeorm';
import { AccountEntity } from '../../domain/entities/AccountEntity';
// import { iPasswordEncryptedVO } from '../../domain/vo/PasswordEncryptedVO';

export interface AccountRepository {
    createAccount(account: AccountEntity): Promise<AccountEntity>;
    getAccountById(accountId: string): Promise<AccountEntity | null>;
}

export class AccountRepositoryDatabase implements AccountRepository {
    constructor(private dataSource: DataSource) {}

    async createAccount(account: AccountEntity): Promise<AccountEntity> {
        try {
            await this.dataSource
                .createQueryBuilder()
                .insert()
                .into('mymetrics.account')
                .values([
                    {
                        account_id: account.getAccountId().getValue(),
                        name: account.getName().getValue(),
                        email: account.getEmail().getValue(),
                        username: account.getUsername().getValue(),
                        password: account.getPassword().getCiphertext(),
                        iv: account.getPassword().getIv(),
                        tag: account.getPassword().getTag(),
                    },
                ])
                .execute();
            return account;
        } catch (err: any) {
            throw new Error(`Occured an error: ${err?.message}`);
        }
    }

    async getAccountById(accountId: string): Promise<AccountEntity | null> {
        try {
            const [accountData] = await this.dataSource
                .createQueryBuilder()
                .select('*')
                .from('mymetrics.account', 'account')
                .where('account.account_id = :accountId', { accountId })
                .execute();
            if (!accountData) return null;
            const account = AccountEntity.restore(
                accountData.account_id,
                accountData.name,
                accountData.email,
                accountData.username,
                {
                    ciphertext: accountData.password,
                    iv: accountData.iv,
                    tag: accountData.tag,
                },
            );
            return account;
        } catch (err) {
            throw new Error(`Occured an error: ${err?.message}`);
        }
    }
}
