export class PasswordVO {
    private password: string;

    constructor(password: string) {
        if (!this.validate(password)) {
            throw new Error('Invalid password');
        }
        this.password = password;
    }

    validate(password: string) {
        return !!password.match(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
        );
    }

    getValue() {
        return this.password;
    }
}
