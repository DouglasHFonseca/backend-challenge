import { IGoalsRepository } from '@modules/goals/repositories/IGoalsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteGoalsUseCase {
  constructor(
    @inject("GoalsRepository")
    private goalsRepository: IGoalsRepository
  ) { }
  async execute(id: string): Promise<void> {
    const findGoals = await this.goalsRepository.findById(id);

    if (!findGoals) throw new AppError("No goal was found with this id");

    await this.goalsRepository.delete(id);
  }
}

export { DeleteGoalsUseCase }