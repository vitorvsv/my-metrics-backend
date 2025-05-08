import { Controller, Post, Body } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TargetRepositoryDatabase } from '@infra/repositories/TargetRepository';
import CreateTargetUseCase from '@application/usecases/CreateTargetUseCase';

@Controller('targets')
export class TargetController {
    constructor(private datasource: DataSource) {}

    @Post()
    async createTarget(@Body() body: Input): Promise<Output> {
        const targetRepository = new TargetRepositoryDatabase(this.datasource);
        const createTargetUseCase = new CreateTargetUseCase(targetRepository);
        const createdTarget = await createTargetUseCase.execute(body);
        return {
            targetId: createdTarget.targetId,
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
