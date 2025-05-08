export class UsernameVO {
    private username: string;

    constructor(username: string) {
        if (!this.validate(username)) {
            throw new Error('Invalid username');
        }

        this.username = username;
    }

    validate(username: string) {
        return username && this.removeNumbers(username.trim()).length > 3;
    }

    removeNumbers(username: string): string {
        return username.replace(/\d+/, '');
    }

    getValue() {
        return this.username;
    }
}
