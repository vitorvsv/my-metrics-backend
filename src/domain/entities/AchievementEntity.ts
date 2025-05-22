import { UUIDVO } from '@domain/vo/UUIDVO';

export default class AchievementEntity {
    private achievementId: UUIDVO;
    private month: number;
    private value: number;
    private targetId: UUIDVO;

    constructor(
        achievementId: string,
        month: number,
        value: number,
        targetId: string,
    ) {
        this.achievementId = new UUIDVO(achievementId);
        this.targetId = new UUIDVO(targetId);
        if (typeof month !== 'number' || month < 1 || month > 12)
            throw new Error('Month need to be between 1 and 12');
        this.month = month;
        this.value = value;
    }

    static create(
        month: number,
        value: number,
        targetId: string,
    ): AchievementEntity {
        return new AchievementEntity(
            UUIDVO.create().getValue(),
            month,
            value,
            targetId,
        );
    }

    getAchievementId() {
        return this.achievementId;
    }

    getMonth() {
        return this.month;
    }

    getValue() {
        return this.value;
    }

    getTargetId() {
        return this.targetId;
    }
}
