import { ICreateGoalsDTO } from '@modules/goals/dtos/ICreateGoalsDTO';
import { Goals } from '@modules/goals/infra/typeorm/entities/Goals';
import { IGoalsRepository } from '../IGoalsRepository';

class GoalsRepositoryInMemory implements IGoalsRepository {
  goals: Goals[] = [];

  async create({ country, flag, meta, local }: ICreateGoalsDTO): Promise<Goals> {
    const goal = new Goals();

    Object.assign(goal,{
      country,
      local,
      meta,
      flag,
    });

    this.goals.push(goal);

    return goal;
  }

  async delete(id: string): Promise<void> {
    const position = this.goals.findIndex((goal) => goal.id === id);

    this.goals.splice(position, 1);
  }

  async localAlreadyExists(country: string, local: string): Promise<Goals> {
    return this.goals.find(
      (goal) =>
        goal.country === country &&
        goal.local === local);
  }

  async findById(id: string): Promise<Goals> {
    return this.goals.find((goal) => goal.id === id);
  }

  async findAll(): Promise<Goals[]> {
    return this.goals.filter((goal) => goal).sort();
  }

}

export { GoalsRepositoryInMemory }