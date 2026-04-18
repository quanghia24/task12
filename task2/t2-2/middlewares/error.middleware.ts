import type { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http-exception.js";

export default function errorMiddleware(
  error: HttpException,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  response.status(status).json({
    status,
    message,
  });
}
