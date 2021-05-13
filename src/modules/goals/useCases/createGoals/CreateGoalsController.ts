import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateGoalsUseCase } from './CreateGoalsUseCase';

export class CreateGoalsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { meta, local, country } = request.body;

    const createGoalsUseCase = container.resolve(CreateGoalsUseCase);

    const goal = await createGoalsUseCase.execute({
      country,
      local,
      meta
    });

    return response.status(201).json(goal);
  }
}