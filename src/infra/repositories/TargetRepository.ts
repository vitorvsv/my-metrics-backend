import { DataSource } from 'typeorm';
import TargetEntity from '@domain/entities/TargetEntity';

export interface TargetRepository {
    createTarget(target: TargetEntity): Promise<TargetEntity>;
    getTargets(
        accountId: string,
        offset: number,
        limit: number,
    ): Promise<TargetEntity[]>;
    hasTargetById(targetId: string): Promise<boolean>;
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

    async getTargets(
        accountId: string,
        offset: number,
        limit: number,
    ): Promise<TargetEntity[]> {
        try {
            const targets = await this.dataSource
                .createQueryBuilder()
                .select('*')
                .from('mymetrics.targets', 'targets')
                .where('targets.account_id = :accountId', { accountId })
                .offset(offset)
                .limit(limit)
                .execute();
            return targets.map((target) => {
                const targetEntity = new TargetEntity(
                    target.target_id,
                    target.description,
                    target.frequency,
                    target.value,
                    target.start_date,
                    target.end_date,
                    target.status,
                    target.account_id,
                );
                return targetEntity;
            });
        } catch (err: any) {
            throw new Error(`Occured an error: ${(err as Error)?.message}`);
        }
    }

    async hasTargetById(targetId: string): Promise<boolean> {
        try {
            const [target] = await this.dataSource
                .createQueryBuilder()
                .select('*')
                .from('mymetrics.targets', 'targets')
                .where('targets.target_id = :targetId', { targetId })
                .execute();
            return !!target?.target_id;
        } catch (err: any) {
            throw new Error(`Occured an error: ${(err as Error)?.message}`);
        }
    }
}
