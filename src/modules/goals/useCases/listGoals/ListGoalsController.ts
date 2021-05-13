import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListGoalsUseCase } from './ListGoalsUseCase';

class ListGoalsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listGoalsUseCase = container.resolve(ListGoalsUseCase);

    const listAll = await listGoalsUseCase.execute();

    return response.json(listAll);
  }
}

export { ListGoalsController }