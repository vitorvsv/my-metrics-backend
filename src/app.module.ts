import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountController } from './infra/adapters/AccountController';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: +configService.get('DB_PORT'),
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASS'),
                database: configService.get('DB_NAME'),
                entities: [],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AccountController, AppController],
    providers: [AppService],
})
export class AppModule {}
