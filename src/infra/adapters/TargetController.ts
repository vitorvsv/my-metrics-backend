import {
    Controller,
    Post,
    Body,
    Get,
    Query,
    ParseIntPipe,
    ParseUUIDPipe,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
    TargetRepository,
    TargetRepositoryDatabase,
} from '@infra/repositories/TargetRepository';
import CreateTargetUseCase from '@application/usecases/CreateTargetUseCase';
import GetTargetsUseCase from '@application/usecases/GetTargetsUseCase';
import TargetEntity from '@domain/entities/TargetEntity';

@Controller('targets')
export class TargetController {
    private targetRepository: TargetRepository;

    constructor(private datasource: DataSource) {
        this.targetRepository = new TargetRepositoryDatabase(this.datasource);
    }

    @Post()
    async createTarget(@Body() body: Input): Promise<Output> {
        const createTargetUseCase = new CreateTargetUseCase(
            this.targetRepository,
        );
        const createdTarget = await createTargetUseCase.execute(body);
        return {
            targetId: createdTarget.targetId,
        };
    }

    @Get()
    async getTargets(
        @Body('accountId', ParseUUIDPipe) accountId: string,
        @Query('limit', ParseIntPipe) limit: number,
        @Query('offset', ParseIntPipe) offset: number,
    ): Promise<any> {
        const getTargetsUseCase = new GetTargetsUseCase(this.targetRepository);
        const getTargetsUseCaseInput = {
            accountId: accountId,
            limit: limit || 10,
            offset: offset || 0,
        };
        const targets = await getTargetsUseCase.execute(getTargetsUseCaseInput);
        return {
            targets: targets.map((target: TargetEntity) => {
                return {
                    targetId: target.getTargetId(),
                    description: target.getDescription(),
                    frequency: target.getFrequency(),
                    value: target.getValue(),
                    startDate: target.getStartDate(),
                    endDate: target.getEndDate(),
                    status: target.getStatus(),
                    accountId: target.getAccountId(),
                };
            }),
        };
    }
}

type Input = {
    description: string;
    frequency: string;
    value: number;
    startDate: string;
    endDate: string;
    status: string;
    accountId: string;
};

type Output = {
    targetId: string;
};
