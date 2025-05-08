import { DataSource } from 'typeorm';
import TargetEntity from '../../domain/entities/TargetEntity';

export interface TargetRepository {
    createTarget(target: TargetEntity): Promise<TargetEntity>;
}

export class TargetRepositoryDatabase implements TargetRepository {
    constructor(private dataSource: DataSource) {}

    async createTarget(target: TargetEntity): Promise<TargetEntity> {
        try {
            await this.dataSource
                .createQueryBuilder()
                .insert()
                .into('mymetrics.targets')
                .values([
                    {
                        target_id: target.getTargetId().getValue(),
                        description: target.getDescription(),
                        frequency: target.getFrequency(),
                        value: target.getValue(),
                        start_date: target.getStartDate(),
                        end_date: target.getEndDate(),
                        status: target.getStatus(),
                        account_id: target.getAccountId().getValue(),
                    },
                ])
                .execute();
            return target;
        } catch (err: any) {
            throw new Error(`Occured an error: ${(err as Error)?.message}`);
        }
    }
}
