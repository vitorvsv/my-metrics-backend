export class NameVO {
    private name: string;

    constructor(name: string) {
        if (!this.validate(name)) {
            throw new Error('Invalid name');
        }
        this.name = name;
    }

    validate(name: string) {
        return !!name.match(/^(.+) (.+)$/);
    }

    getValue() {
        return this.name;
    }
}
