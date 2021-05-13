import { getRepository, Repository } from 'typeorm';

import { ICreateGoalsDTO } from '@modules/goals/dtos/ICreateGoalsDTO';
import { IGoalsRepository } from '@modules/repositories/IGoalsRepository';

import { Goals } from './entities/Goals';

export class GoalsRepository implements IGoalsRepository {
  private repository: Repository<Goals>;

  constructor() {
    this.repository = getRepository(Goals);
  }

  async create({ id, country, local, meta, flag }: ICreateGoalsDTO): Promise<Goals> {
    const goals = this.repository.create({
      id,
      country,
      local,
      meta,
      flag
    });

    return this.repository.save(goals);;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async localAlreadyExists(country: string, local: string): Promise<Goals> {
    return this.repository.findOne({ country, local });
  }

  async findById(id: string): Promise<Goals> {
    return this.repository.findOne(id);
  }

  async findAll(): Promise<Goals[]> {
    return this.repository.find({
      order: {
        meta: 'ASC'
      }
    })
  }
}

