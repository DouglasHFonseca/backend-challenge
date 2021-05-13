import { Goals } from '@modules/goals/infra/typeorm/entities/Goals';
import { IGoalsRepository } from '@modules/repositories/IGoalsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListGoalsUseCase {
  constructor(
    @inject("GoalsRepository")
    private goalsRepository: IGoalsRepository,
  ) { }
  async execute(): Promise<Goals[]> {
    return this.goalsRepository.findAll();
  }
}
export { ListGoalsUseCase }