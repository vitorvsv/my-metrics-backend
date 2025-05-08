import { TargetRepository } from '@infra/repositories/TargetRepository';
import TargetEntity from '@domain/entities/TargetEntity';

export default class CreateTargetUseCase {
    constructor(private readonly targetRepository: TargetRepository) {}

    async execute(input: Input): Promise<Output> {
        const target = TargetEntity.create(
            input.description,
            input.frequency,
            input.value,
            input.startDate,
            input.endDate,
            input.status,
            input.accountId,
        );
        const targetCreated = await this.targetRepository.createTarget(target);
        return {
            targetId: targetCreated.getTargetId().getValue(),
        };
    }
}

type Input = {
    description: string;
    frequency: string;
    value: number;
    startDate: Date;
    endDate: Date;
    status: string;
    accountId: string;
};

type Output = {
    targetId: string;
};
