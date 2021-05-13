import { ICreateGoalsDTO } from '@modules/goals/dtos/ICreateGoalsDTO';
import { Goals } from '@modules/goals/infra/typeorm/entities/Goals';
import { IGoalsRepository } from '@modules/repositories/IGoalsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IApiProvider } from '@shared/container/providers/ApiProvider/IApiProvider';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import dayjs from 'dayjs';


@injectable()
class CreateGoalsUseCase {
  constructor(
    @inject("GoalsRepository")
    private goalsRepository: IGoalsRepository,
    @inject("CountriesNowProvider")
    private countriesNowProvider: IApiProvider,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) { }

  async execute({ country, local, meta }: ICreateGoalsDTO): Promise<Goals> {
    const city = await this.countriesNowProvider.findLocation(country, local);
    if (!city) throw new AppError("City not found!");

    const findGoals = await this.goalsRepository.localAlreadyExists(country, city);
    if (findGoals) throw new AppError("Goal already exists!");

    const day = dayjs().get("date");
    const parseMeta = this.dateProvider.customDate(`${day}/${meta}`);
    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(
      dateNow,
      parseMeta
    );

    if (compare < 0) throw new AppError("Invalid time!");

    const flag = await this.countriesNowProvider.findFlag(country);

    const goal = await this.goalsRepository.create({
      country,
      local,
      meta: parseMeta,
      flag
    });

    return goal;
  }
}

export { CreateGoalsUseCase }