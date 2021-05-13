import { container } from "tsyringe";
import "@shared/container/providers";
import { IGoalsRepository } from '@modules/repositories/IGoalsRepository';
import { GoalsRepository } from '@modules/goals/infra/typeorm/GoalsRepository';

container.registerSingleton<IGoalsRepository>(
  "GoalsRepository",
  GoalsRepository
);