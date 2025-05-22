import { IsNumber, IsNotEmpty, IsUUID, Max, Min } from 'class-validator';

export default class CreateAchievementValidator {
    @IsNotEmpty()
    @IsNumber()
    @Max(12)
    @Min(1)
    month: number;

    @IsNotEmpty()
    @IsNumber()
    value: number;

    @IsNotEmpty()
    @IsUUID()
    targetId: string;
}
