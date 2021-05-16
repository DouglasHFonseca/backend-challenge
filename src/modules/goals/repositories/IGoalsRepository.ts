import { ICreateGoalsDTO } from '@modules/goals/dtos/ICreateGoalsDTO';
import { Goals } from '@modules/goals/infra/typeorm/entities/Goals';

export interface IGoalsRepository {
  create(data: ICreateGoalsDTO): Promise<Goals>;
  delete(id: string): Promise<void>;
  localAlreadyExists(country: string, local: string): Promise<Goals>;
  findById(id: string): Promise<Goals>;
  findAll(): Promise<Goals[]>;
}