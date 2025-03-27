export class UUIDVO {
    private uuid: string;

    constructor(uuid: string) {
        if (!this.validate(uuid)) {
            throw new Error('Invalid UUID');
        }
        this.uuid = uuid;
    }

    static create() {
        return new UUIDVO(crypto.randomUUID());
    }

    validate(uuid: string) {
        return !!uuid.match(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
        );
    }

    getValue() {
        return this.uuid;
    }
}
