import { Goals } from '@modules/goals/infra/typeorm/entities/Goals';
import { IGoalsRepository } from '@modules/goals/repositories/IGoalsRepository';
import { IApiProvider } from '@shared/container/providers/ApiProvider/IApiProvider';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import dayjs from 'dayjs';
import { inject, injectable } from 'tsyringe';



interface IRequest {
  id: string;
  local?: string;
  meta?: Date;
}

@injectable()
class EditGoalsUseCase {
  constructor(
    @inject("GoalsRepository")
    private goalsRepository: IGoalsRepository,
    @inject("CountriesNowProvider")
    private countriesNowProvider: IApiProvider,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) { }
  async execute({ id, local, meta }: IRequest): Promise<Goals> {
    const goal = await this.goalsRepository.findById(id);

    if (!goal) throw new AppError("Goal doesn't exists!");

    if (local) {
      const city = await this.countriesNowProvider.findLocation(goal.country, local);
      if (!city) throw new AppError("City not found!");
      goal.local = local;
      goal.updated_at = this.dateProvider.dateNow();
    }

    if (meta) {
      const day = dayjs().get("date");
      const parseMeta = this.dateProvider.customDate(`${day}/${meta}`);
      const dateNow = this.dateProvider.dateNow();
      const compare = this.dateProvider.compareInHours(
        dateNow,
        parseMeta
      );
      if (compare < 0) throw new AppError("Invalid time!");
      goal.meta = parseMeta;
      goal.updated_at = this.dateProvider.dateNow();
    }


    const updatedGoal = await this.goalsRepository.create(goal);

    return updatedGoal;

  }
}

export { EditGoalsUseCase }