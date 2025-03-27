import { NameVO } from '../../../../src/domain/vo/NameVO';

describe('NameVO test suite', () => {
    test.each(['Vitor', 'Soares', ''])(
        'should not accept invalid name like %s',
        (name) => {
            expect(() => {
                new NameVO(name);
            }).toThrow('Invalid name');
        },
    );

    test.each(['Vitor Soares Vian', 'Vitor Soares', 'Vitor Vian'])(
        'should accept valid name like %s',
        (name) => {
            expect(new NameVO(name)).toBeDefined();
        },
    );
});
