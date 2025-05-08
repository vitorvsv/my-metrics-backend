import { UUIDVO } from '@domain/vo/UUIDVO';
import { AccountEntity } from '@domain/entities/AccountEntity';
import { PasswordEncryptedVO } from '@domain/vo/PasswordEncryptedVO';

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
    });

    it('should restore an account', () => {
        const passwordEncrypted = PasswordEncryptedVO.encrypt('Password@12345');
        const input = {
            name: 'Vitor Vian',
            email: 'vitor@gmail.com',
            username: 'vitorvsv',
            password: {
                ciphertext: passwordEncrypted.ciphertext,
                iv: passwordEncrypted.iv,
                tag: passwordEncrypted.tag,
            },
        };
        const account = AccountEntity.restore(
            UUIDVO.create().getValue(),
            input.name,
            input.email,
            input.username,
            input.password,
        );
        expect(account.getAccountId()).toBeInstanceOf(UUIDVO);
        expect(account.getUsername().getValue()).toEqual(input.username);
        expect(account.getEmail().getValue()).toEqual(input.email);
        expect(account.getName().getValue()).toEqual(input.name);
        expect(account.getPassword().getCiphertext()).toEqual(
            input.password.ciphertext,
        );
        expect(account.getPassword().getIv()).toEqual(input.password.iv);
        expect(account.getPassword().getTag()).toEqual(input.password.tag);
    });
});
