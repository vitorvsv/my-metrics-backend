import { UsernameVO } from '../vo/UsernameVO';
import { EmailVO } from '../vo/EmailVO';
import { NameVO } from '../vo/NameVO';
import { PasswordVO } from '../vo/PasswordVO';
import { UUIDVO } from '../vo/UUIDVO';

export class AccountEntity {
    private accountId: UUIDVO;
    private name: NameVO;
    private email: EmailVO;
    private username: UsernameVO;
    private password: PasswordVO;

    constructor(
        accountId: string,
        name: string,
        email: string,
        username: string,
        password: string,
    ) {
        this.accountId = new UUIDVO(accountId);
        this.name = new NameVO(name);
        this.email = new EmailVO(email);
        this.username = new UsernameVO(username);
        this.password = new PasswordVO(password);
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

    getPassword() {
        return this.password;
    }
}
