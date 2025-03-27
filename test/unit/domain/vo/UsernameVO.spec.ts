import { UsernameVO } from '../../../../src/domain/vo/UsernameVO';

describe('UsernameVO test suite', () => {
    test.each(['', '123', '123456789'])(
        'should not accept invalid username like %s',
        (username) => {
            expect(() => {
                new UsernameVO(username);
            }).toThrow('Invalid username');
        },
    );

    test.each(['vitinho', 'vitorvsv'])(
        'should accept username like %s',
        (username) => {
            expect(() => {
                new UsernameVO(username);
            }).toBeDefined();
        },
    );
});
