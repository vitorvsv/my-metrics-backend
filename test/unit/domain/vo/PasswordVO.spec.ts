import { PasswordVO } from '../../../../src/domain/vo/PasswordVO';

describe('PasswordVO test suite', () => {
    test.each(['123456', 'teste', '@teste', 'vitor12345678', 'qweryt@aaaaaa'])(
        'should not accept invalid password like %s',
        (password) => {
            expect(() => {
                new PasswordVO(password);
            }).toThrow('Invalid password');
        },
    );

    test.each(['123456@teste', 'passwordLOUCO@983421', 'Password@12345'])(
        'should accept password like %s',
        (password) => {
            expect(() => {
                new PasswordVO(password);
            }).toBeDefined();
        },
    );
});
