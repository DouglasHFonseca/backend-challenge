import { GoalsRepositoryInMemory } from '@modules/goals/repositories/in-memory/GoalsRepositoryInMemory';
import { CountriesNowProvider } from '@shared/container/providers/ApiProvider/implementations/CountriesNowProvider';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/Implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import { CreateGoalsUseCase } from './CreateGoalsUseCase'

let createGoalsUseCase: CreateGoalsUseCase;
let goalsRepositoryInMemory: GoalsRepositoryInMemory;
let countriesNowProvider: CountriesNowProvider;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Goals", () => {

  beforeEach(() => {
    goalsRepositoryInMemory = new GoalsRepositoryInMemory();
    countriesNowProvider = new CountriesNowProvider();
    dayjsDateProvider = new DayjsDateProvider();
    createGoalsUseCase = new CreateGoalsUseCase(
      goalsRepositoryInMemory,
      countriesNowProvider,
      dayjsDateProvider
    );
  });

  it("Should be able to create a new goal", async () => {
    const goal = await createGoalsUseCase.execute({
      country: "Brazil",
      local: "Uba",
      meta: dayjsDateProvider.dateNow()
    });
    expect(goal).toHaveProperty("country");
  });

  it("should not be able to create a new goal if there's another one open for the same location", async () => {
    await goalsRepositoryInMemory.create({
      country: "Brazil",
      local: "Laranjeiras",
      meta: new Date()
    });
    await expect(
      createGoalsUseCase.execute({
        country: "Brazil",
        local: "Laranjeiras",
        meta: new Date()
      })
    ).rejects.toEqual(new AppError("Goal already exists!"));
  });

  it("should be able to list all goals", async () => {
    await goalsRepositoryInMemory.create({
      country: "Brazil",
      local: "Laranjeiras",
      meta: new Date(),
      flag: "flagBrazil"
    });
    await goalsRepositoryInMemory.create({
      country: "Brazil",
      local: "Uba",
      meta: new Date(),
      flag: "flagBrazil"
    });
    const list = await goalsRepositoryInMemory.findAll();
    expect(list[0]).toHaveProperty("local");
    expect(list.length).toBe(2);
  })

})
