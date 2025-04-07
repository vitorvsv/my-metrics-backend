import { PasswordEncryptedVO } from '../../../../src/domain/vo/PasswordEncryptedVO';

beforeAll(() => {
    process.env.APP_KEY = 'id/T+UxlkL63B3QVrqA/Kd62kM6nWdr18tmjvsFdfo0=';
});

describe('PasswordEncryptedVO test suite', () => {
    it('Should generate a key', () => {
        const key = PasswordEncryptedVO.generateKey();
        expect(key).toBeDefined();
    });

    it('Should encrypt a password', () => {
        const password = '123456@teste';
        const encryptedPassword = PasswordEncryptedVO.encrypt(password);
        expect(encryptedPassword.ciphertext).toBeDefined();
        expect(encryptedPassword.tag).toBeDefined();
        expect(encryptedPassword.iv).toBeDefined();
    });

    it('Should decrypt a password', () => {
        const password = '123456@teste';
        const encryptedPassword = PasswordEncryptedVO.encrypt(password);
        const decryptedPassword = PasswordEncryptedVO.decrypt(
            encryptedPassword.ciphertext,
            encryptedPassword.iv,
            encryptedPassword.tag,
        );
        expect(decryptedPassword).toEqual(password);
    });
});
