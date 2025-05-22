import AchievementEntity from '@domain/entities/AchievementEntity';
import { UUIDVO } from '@domain/vo/UUIDVO';

describe('AchievementEntity test suite', () => {
    it('Should create a month achievement', () => {
        const input = {
            month: 1,
            value: 7,
            targetId: UUIDVO.create().getValue(),
        };
        const achievement: AchievementEntity = AchievementEntity.create(
            input.month,
            input.value,
            input.targetId,
        );
        expect(achievement.getAchievementId()).toBeInstanceOf(UUIDVO);
        expect(achievement.getMonth()).toEqual(input.month);
        expect(achievement.getValue()).toEqual(input.value);
    });

    test.each([0, 13, -1])('Should not accept month %s', (month) => {
        const input = {
            value: 7,
            targetId: UUIDVO.create().getValue(),
        };
        expect(() => {
            AchievementEntity.create(month, input.value, input.targetId);
        }).toThrow('Month need to be between 1 and 12');
    });
});
