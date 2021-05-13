import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import cors from 'cors';

import { AppError } from '@shared/errors/AppError';
import createConnection from "./database";

import "@shared/container";

import {router} from "./routes"

const app = express();
createConnection();

app.use(express.json());

app.use(router);

app.use(cors());
app.use(express.json());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };