import "reflect-metadata";

import { CreateGoalsController } from '@modules/goals/useCases/createGoals/CreateGoalsController';
import { EditGoalsController } from '@modules/goals/useCases/editGoals/EditGoalsController';
import { Router } from "express";
import { ListGoalsController } from '@modules/goals/useCases/listGoals/ListGoalsController';
import { DeleteGoalsController } from '@modules/goals/useCases/deleteGoals/DeleteGoalsController';

const goalsRoutes = Router();

const createGoalsController = new CreateGoalsController;
const editGoalsController = new EditGoalsController;
const listGoalsController = new ListGoalsController;
const deleteGoalsController = new DeleteGoalsController;

goalsRoutes.post("/", createGoalsController.handle);
goalsRoutes.patch("/edit/:id", editGoalsController.handle);
goalsRoutes.get("/", listGoalsController.handle);
goalsRoutes.delete("/delete/:id", deleteGoalsController.handle);

export { goalsRoutes };