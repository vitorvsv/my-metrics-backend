import { UsernameVO } from '../vo/UsernameVO';
import { EmailVO } from '../vo/EmailVO';
import { NameVO } from '../vo/NameVO';
import { UUIDVO } from '../vo/UUIDVO';
import {
    PasswordEncryptedVO,
    iPasswordEncryptedVO,
} from '../vo/PasswordEncryptedVO';

export class AccountEntity {
    private accountId: UUIDVO;
    private name: NameVO;
    private email: EmailVO;
    private username: UsernameVO;
    private password: PasswordEncryptedVO;

    constructor(
        accountId: string,
        name: string,
        email: string,
        username: string,
        password: string | iPasswordEncryptedVO,
    ) {
        this.accountId = new UUIDVO(accountId);
        this.name = new NameVO(name);
        this.email = new EmailVO(email);
        this.username = new UsernameVO(username);

        this.password =
            typeof password === 'object'
                ? PasswordEncryptedVO.restore(
                      password.ciphertext,
                      password.iv,
                      password.tag,
                  )
                : PasswordEncryptedVO.create(password);
    }

    static create(
        name: string,
        email: string,
        username: string,
        password: string,
    ) {
        return new AccountEntity(
            UUIDVO.create().getValue(),
            name,
            email,
            username,
            password,
        );
    }

    static restore(
        accountId: string,
        name: string,
        email: string,
        username: string,
        password: string | iPasswordEncryptedVO,
    ) {
        return new AccountEntity(accountId, name, email, username, password);
    }

    getAccountId() {
        return this.accountId;
    }

    getUsername() {
        return this.username;
    }

    getEmail() {
        return this.email;
    }

    getName() {
        return this.name;
    }

    getPassword(): PasswordEncryptedVO {
        return this.password;
    }
}
