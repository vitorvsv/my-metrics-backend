import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountController } from '@infra/adapters/AccountController';
import { TargetController } from '@infra/adapters/TargetController';
import { AchievementController } from '@infra/adapters/AchievementController';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_TEST_HOST'),
                port: +configService.get('DB_TEST_PORT'),
                username: configService.get('DB_TEST_USER'),
                password: configService.get('DB_TEST_PASS'),
                database: configService.get('DB_TEST_NAME'),
                entities: [],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [
        TargetController,
        AccountController,
        AchievementController,
        AppController,
    ],
    providers: [AppService],
})
export class AppTestingModule {}
