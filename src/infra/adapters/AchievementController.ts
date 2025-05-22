import CreateAchievementUseCase from '@application/usecases/CreateAchievementUseCase';
import { AchievementRepositoryDatabase } from '@infra/repositories/AchievementRepository';
import { TargetRepositoryDatabase } from '@infra/repositories/TargetRepository';
import CreateAchievementValidator from '@infra/validators/CreateAchievementValidator';
import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller('achievements')
export class AchievementController {
    constructor(private datasource: DataSource) {}

    @Post()
    @UsePipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    )
    async createAchievement(
        @Body() body: CreateAchievementValidator,
    ): Promise<any> {
        const achievementRepository = new AchievementRepositoryDatabase(
            this.datasource,
        );
        const targetRepository = new TargetRepositoryDatabase(this.datasource);
        const createAchievementUseCase = new CreateAchievementUseCase(
            achievementRepository,
            targetRepository,
        );
        const achievement = await createAchievementUseCase.execute({
            month: body?.month,
            value: body?.value,
            targetId: body?.targetId,
        });
        return {
            achievementId: achievement.achievementId,
        };
    }
}
