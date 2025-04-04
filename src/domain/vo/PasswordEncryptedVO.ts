import * as crypto from 'crypto';

import * as dotenv from 'dotenv';
dotenv.config();

export class PasswordEncryptedVO {
    private ciphertext: string;
    private iv: string;
    private tag: Buffer;

    constructor(ciphertext: string, iv: string, tag: Buffer) {
        this.ciphertext = ciphertext;
        this.iv = iv;
        this.tag = tag;
    }

    static create(password: string) {
        if (!this.validate(password)) {
            throw new Error('Invalid password');
        }
        const passwordEncrypted = this.encrypt(password);
        return new PasswordEncryptedVO(
            passwordEncrypted.ciphertext,
            passwordEncrypted.iv,
            passwordEncrypted.tag,
        );
    }

    static restore(ciphertext: string, iv: string, tag: Buffer) {
        return new PasswordEncryptedVO(ciphertext, iv, tag);
    }

    static validate(password: string) {
        return !!password.match(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
        );
    }

    getValue(): Output {
        return {
            ciphertext: this.ciphertext,
            iv: this.iv,
            tag: this.tag,
        };
    }

    getCiphertext() {
        return this.ciphertext;
    }

    getIv() {
        return this.iv;
    }

    getTag() {
        return this.tag;
    }

    static generateKey(): string {
        const key = crypto.randomBytes(32).toString('base64');
        return key;
    }

    static encrypt(plaintext: string): {
        ciphertext: string;
        tag: Buffer;
        iv: string;
    } {
        const key = process.env.APP_KEY as string;
        const iv = crypto.randomBytes(12).toString('base64');
        const cipher = crypto.createCipheriv(
            'aes-256-gcm',
            Buffer.from(key, 'base64'),
            Buffer.from(iv, 'base64'),
        );
        let ciphertext = cipher.update(plaintext, 'utf8', 'base64');
        ciphertext += cipher.final('base64');
        const tag = cipher.getAuthTag();
        return { ciphertext, tag, iv };
    }

    static decrypt(ciphertext: string, iv: string, tag: Buffer): string {
        const key = process.env.APP_KEY as string;
        const decipher = crypto.createDecipheriv(
            'aes-256-gcm',
            Buffer.from(key, 'base64'),
            Buffer.from(iv, 'base64'),
        );
        decipher.setAuthTag(tag);
        let plaintext = decipher.update(ciphertext, 'base64', 'utf8');
        plaintext += decipher.final('utf8');
        return plaintext;
    }

    static match(
        plaintext: string,
        password: string,
        iv: string,
        tag: Buffer,
    ): boolean {
        const plaintextDecrypted = PasswordEncryptedVO.decrypt(
            password,
            iv,
            tag,
        );
        return plaintext === plaintextDecrypted;
    }
}

export interface iPasswordEncryptedVO {
    ciphertext: string;
    iv: string;
    tag: Buffer;
}

type Output = {
    ciphertext: string;
    iv: string;
    tag: Buffer;
};
