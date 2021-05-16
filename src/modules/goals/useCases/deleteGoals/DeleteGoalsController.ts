import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteGoalsUseCase } from './DeleteGoalsUseCase';

class DeleteGoalsController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteGoalsUseCase = container.resolve(DeleteGoalsUseCase);

    await deleteGoalsUseCase.execute(id);

    return response.status(204).send();
  }

}

export { DeleteGoalsController }