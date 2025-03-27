import { UUIDVO } from '../../../../src/domain/vo/UUIDVO';

describe('UuidVO test suite', () => {
    test.each(['1224324324', 'soadwa3rarawddes', ''])(
        'should not accept invalid UUID like %s',
        (name) => {
            expect(() => {
                new UUIDVO(name);
            }).toThrow('Invalid UUID');
        },
    );

    test.each([
        'a9c34daa-c4b8-4a00-a95a-3a572d1abe9e',
        'c2889120-2559-41bb-9c4a-29dead203e06',
    ])('should accept valid UUID like %s', (name) => {
        expect(() => {
            new UUIDVO(name);
        }).toBeDefined();
    });
});
