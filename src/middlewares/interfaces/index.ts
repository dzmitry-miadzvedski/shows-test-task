import { NextFunction, Request, Response } from 'express';

type BaseMiddleware = (request: Request, response: Response, next: NextFunction) => void;

type ErrorMiddleware = (error: Error, request: Request, response: Response, next: NextFunction) => void;

type Middleware = BaseMiddleware | ErrorMiddleware;

export { Middleware };
