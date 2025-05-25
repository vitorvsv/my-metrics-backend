import { UUIDVO } from '../vo/UUIDVO';

export default class TargetEntity {
    private targetId: UUIDVO;
    private description: string;
    private frequency: string;
    private value: number;
    private startDate: Date;
    private endDate: Date;
    private status: string;
    private accountId: UUIDVO;

    constructor(
        targetId: string,
        description: string,
        frequency: string,
        value: number,
        startDate: string,
        endDate: string,
        status: string,
        accountId: string,
    ) {
        if (!description.length) throw new Error('Description is required');
        if (!frequency) throw new Error('Frequency is required');
        if (!value || value < 0) throw new Error('Value is required');
        if (new Date(endDate) < new Date(startDate))
            throw new Error('End date is less than start date');
        this.targetId = new UUIDVO(targetId);
        this.description = description;
        this.frequency = frequency;
        this.value = value;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.status = status;
        this.accountId = new UUIDVO(accountId);
    }

    static create(
        description: string,
        frequency: string,
        value: number,
        startDate: string,
        endDate: string,
        status: string,
        accountId: string,
    ) {
        return new TargetEntity(
            UUIDVO.create().getValue(),
            description,
            frequency,
            value,
            startDate,
            endDate,
            status,
            new UUIDVO(accountId).getValue(),
        );
    }

    getTargetId() {
        return this.targetId;
    }

    getDescription(): string {
        return this.description;
    }

    getFrequency(): string {
        return this.frequency;
    }

    getValue(): number {
        return this.value;
    }

    getStartDate(): Date {
        return this.startDate;
    }

    getEndDate(): Date {
        return this.endDate;
    }

    getStatus(): string {
        return this.status;
    }

    getAccountId() {
        return this.accountId;
    }
}
