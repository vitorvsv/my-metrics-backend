import { UUIDVO } from '../../../../src/domain/vo/UUIDVO';
import TargetEntity from '../../../../src/domain/entities/TargetEntity';

const targetEntityInput = {
    description: 'Estudar inglês',
    frequency: 'monthly',
    value: 17,
    startDate: '2025-01-01T03:00:00.000Z',
    endDate: '2025-12-31T03:00:00.000Z',
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
        expect(target.getStartDate().toISOString()).toEqual(input.startDate);
        expect(target.getEndDate().toISOString()).toEqual(input.endDate);
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
            endDate: '2024-01-01T03:00:00.000Z',
            startDate: '2025-01-01T03:00:00.000Z',
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
