export class EmailVO {
    private email: string;

    constructor(email: string) {
        if (!this.validate(email)) {
            throw new Error('Invalid email');
        }
        this.email = email;
    }

    validate(email: string) {
        return !!email.match(/^(.+)@(.+)\.(.+)$/);
    }

    getValue() {
        return this.email;
    }
}
