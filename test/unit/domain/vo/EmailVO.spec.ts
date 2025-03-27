import { EmailVO } from '../../../../src/domain/vo/EmailVO';

describe('EmailVO test suite', () => {
    test.each(['vitor@', 'vitor@teste', '@teste.com'])(
        'should not accept invalid email like %s',
        (email) => {
            expect(() => {
                new EmailVO(email);
            }).toThrow('Invalid email');
        },
    );

    test.each(['vitor@teste.com', 'vitor@gmail.com', 'vitor@yahoo.com.br'])(
        'should accept valid email like %s',
        (email) => {
            expect(() => {
                new EmailVO(email);
            }).toBeDefined();
        },
    );
});
