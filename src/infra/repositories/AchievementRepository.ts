import { DataSource } from 'typeorm';
import AchievementEntity from '@domain/entities/AchievementEntity';

export interface AchievementRepository {
    createAchievement(
        achievement: AchievementEntity,
    ): Promise<AchievementEntity>;
}

export class AchievementRepositoryDatabase implements AchievementRepository {
    constructor(private dataSource: DataSource) {}

    async createAchievement(
        achievement: AchievementEntity,
    ): Promise<AchievementEntity> {
        try {
            await this.dataSource
                .createQueryBuilder()
                .insert()
                .into('mymetrics.achievements')
                .values([
                    {
                        achievement_id: achievement
                            .getAchievementId()
                            .getValue(),
                        value: achievement.getValue(),
                        month: achievement.getMonth(),
                        target_id: achievement.getTargetId().getValue(),
                    },
                ])
                .execute();
            return achievement;
        } catch (err: any) {
            throw new Error(`Occured an error: ${(err as Error)?.message}`);
        }
    }
}
