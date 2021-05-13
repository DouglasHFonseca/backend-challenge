import { Router } from "express";
import { goalsRoutes } from './goals.routes';

export const router = Router();

router.use("/goals", goalsRoutes);

