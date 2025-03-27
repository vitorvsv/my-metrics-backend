import { UUIDVO } from '../../../../src/domain/vo/UUIDVO';
import { AccountEntity } from '../../../../src/domain/entities/AccountEntity';

describe('AccountEntity test suite', () => {
    it('should create an account', () => {
        const input = {
            name: 'Vitor Vian',
            email: 'vitor@gmail.com',
            username: 'vitorvsv',
            password: 'Password@12345',
        };
        const account = AccountEntity.create(
            input.name,
            input.email,
            input.username,
            input.password,
        );
        expect(account.getAccountId()).toBeInstanceOf(UUIDVO);
        expect(account.getUsername().getValue()).toEqual(input.username);
        expect(account.getEmail().getValue()).toEqual(input.email);
        expect(account.getName().getValue()).toEqual(input.name);
        expect(account.getPassword().getValue()).toEqual(input.password);
    });
});
