import { UUIDVO } from '../../../../src/domain/vo/UUIDVO';
import TargetEntity from '../../../../src/domain/entities/TargetEntity';

const targetEntityInput = {
    description: 'Estudar inglês',
    frequency: 'monthly',
    value: 17,
    startDate: new Date(2025, 0, 1),
    endDate: new Date(2025, 11, 31),
    status: 'active',
    accountId: UUIDVO.create().getValue(),
};

beforeAll(() => {
    jest.clearAllMocks();
    jest.resetModules();
});

describe('TargetEntity test suite', () => {
    it('should create a target entity', () => {
        const input = {
            ...targetEntityInput,
        };
        const target = TargetEntity.create(
            input.description,
            input.frequency,
            input.value,
            input.startDate,
            input.endDate,
            input.status,
            input.accountId,
        );
        expect(target.getTargetId()).toBeInstanceOf(UUIDVO);
        expect(target.getDescription()).toEqual(input.description);
        expect(target.getFrequency()).toEqual(input.frequency);
        expect(target.getValue()).toEqual(input.value);
        expect(target.getStartDate()).toEqual(input.startDate);
        expect(target.getEndDate()).toEqual(input.endDate);
        expect(target.getStatus()).toEqual(input.status);
        expect(target.getAccountId()).toBeInstanceOf(UUIDVO);
    });

    it('Should throw an error if description is empty', () => {
        const input = {
            ...targetEntityInput,
            description: '',
        };
        expect(() => {
            TargetEntity.create(
                input.description,
                input.frequency,
                input.value,
                input.startDate,
                input.endDate,
                input.status,
                input.accountId,
            );
        }).toThrow('Description is required');
    });

    it('Should throw an error if frequency is not definied', () => {
        const input = {
            ...targetEntityInput,
            frequency: '',
        };
        expect(() => {
            TargetEntity.create(
                input.description,
                input.frequency,
                input.value,
                input.startDate,
                input.endDate,
                input.status,
                input.accountId,
            );
        }).toThrow('Frequency is required');
    });

    it('Should throw an error if value is equal to 0', () => {
        const input = {
            ...targetEntityInput,
            value: 0,
        };
        expect(() => {
            TargetEntity.create(
                input.description,
                input.frequency,
                input.value,
                input.startDate,
                input.endDate,
                input.status,
                input.accountId,
            );
        }).toThrow('Value is required');
    });

    it('Should throw an error if endDate is less than startDate', () => {
        const input = {
            ...targetEntityInput,
            endDate: new Date(2024, 0, 1),
            startDate: new Date(2025, 0, 1),
        };
        expect(() => {
            TargetEntity.create(
                input.description,
                input.frequency,
                input.value,
                input.startDate,
                input.endDate,
                input.status,
                input.accountId,
            );
        }).toThrow('End date is less than start date');
    });
});
