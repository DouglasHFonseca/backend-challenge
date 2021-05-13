import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { EditGoalsUseCase } from './EditGoalsUseCase';


class EditGoalsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { meta, local } = request.body;

    const editGoalsUseCase = container.resolve(EditGoalsUseCase);

    const updatedGoal = await editGoalsUseCase.execute({
      id,
      meta,
      local
    });

    return response.status(200).json(updatedGoal);
  }
}

export { EditGoalsController }