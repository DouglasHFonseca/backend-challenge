import { Goals } from '@modules/goals/infra/typeorm/entities/Goals';
import { GoalsRepositoryInMemory } from '@modules/goals/repositories/in-memory/GoalsRepositoryInMemory';
import { ListGoalsUseCase } from './ListGoalsUseCase'

let listGoalsUseCase: ListGoalsUseCase;
let goalsRepositoryInMemory: GoalsRepositoryInMemory;


describe("List Goals", () => {

  beforeEach(() => {
    goalsRepositoryInMemory = new GoalsRepositoryInMemory();
    listGoalsUseCase = new ListGoalsUseCase(goalsRepositoryInMemory);
  })

  it("should be able to list all goals", async () => {
   await goalsRepositoryInMemory.create({
      country: "Brazil",
      local: "Uba",
      meta: new Date(),
      flag: "FlagBrazil"
    });
    
    const list = await listGoalsUseCase.execute()

    expect(list[0].local).toBe("Uba");
  })
})