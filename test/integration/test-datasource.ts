import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

/**
 * Configuração do DataSource para testes de integração,
 * lida a partir das variáveis de ambiente DB_TEST_*.
 */
export function getTestDataSourceOptions(): DataSourceOptions {
    return {
        type: (process.env.DB_TEST_TYPE as 'postgres') || 'postgres',
        host: process.env.DB_TEST_HOST || 'localhost',
        port: parseInt(process.env.DB_TEST_PORT || '5432', 10),
        username: process.env.DB_TEST_USER || 'postgres',
        password: process.env.DB_TEST_PASS || '',
        database: process.env.DB_TEST_NAME || 'mymetrics',
        entities: [],
        synchronize: true,
    };
}
