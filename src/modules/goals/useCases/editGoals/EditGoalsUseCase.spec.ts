import { IGoalsRepository } from '@modules/goals/repositories/IGoalsRepository';
import { GoalsRepositoryInMemory } from '@modules/goals/repositories/in-memory/GoalsRepositoryInMemory';
import { CountriesNowProvider } from '@shared/container/providers/ApiProvider/implementations/CountriesNowProvider';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/Implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import { EditGoalsUseCase } from './EditGoalsUseCase'

let editGoalsUseCase: EditGoalsUseCase;
let goalsRepositoryInMemory: GoalsRepositoryInMemory;
let countriesNowProvider: CountriesNowProvider;
let dayjsDateProvider: DayjsDateProvider;

describe("Delete Goals", () => {

  beforeEach(() => {
    goalsRepositoryInMemory = new GoalsRepositoryInMemory();
    countriesNowProvider = new CountriesNowProvider();
    dayjsDateProvider = new DayjsDateProvider();
    editGoalsUseCase = new EditGoalsUseCase(
      goalsRepositoryInMemory,
      countriesNowProvider,
      dayjsDateProvider
    );
  });

  it("should to be able to edit a goal", async () => {
    const goal = await goalsRepositoryInMemory.create({
      country: "Brazil",
      local: "Uba",
      meta: new Date(),
      flag: "FlagBrazil"
    });

    const editedGoals = await editGoalsUseCase.execute({
      id: goal.id,
      local: "Laranjeiras"
    });

    expect(editedGoals.local).toBe("Laranjeiras");
  });

  it("should not be able to edit goals with non-exists local", async () => {
    const goal = await goalsRepositoryInMemory.create({
      country: "Brazil",
      local: "Uba",
      meta: new Date(),
      flag: "FlagBrazil"
    });
    await expect(
      editGoalsUseCase.execute({
        id: goal.id,
        local: "xxxxx"
      })
    ).rejects.toEqual(new AppError("City not found!"));
  });

  it("should not be able to edit goals with invalid date", async () => {
    const goal = await goalsRepositoryInMemory.create({
      country: "Brazil",
      local: "Uba",
      meta: new Date(),
      flag: "FlagBrazil"
    });

    const parseMeta = dayjsDateProvider.customDate("01/01/2020");
  
    await expect(
      editGoalsUseCase.execute({
        id: goal.id,
        meta: parseMeta
      })
    ).rejects.toEqual(new AppError("Invalid time!"));
  });
})
