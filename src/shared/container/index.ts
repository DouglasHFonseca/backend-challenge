import { container } from "tsyringe";
import "@shared/container/providers";
import { GoalsRepository } from '@modules/goals/infra/typeorm/repositories/GoalsRepository';
import { IGoalsRepository } from '@modules/goals/repositories/IGoalsRepository';

container.registerSingleton<IGoalsRepository>(
  "GoalsRepository",
  GoalsRepository
);