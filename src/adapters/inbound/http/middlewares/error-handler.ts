// adapters/inbound/http/middlewares/error-handler.ts
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../../../core/application/errors/app.error";

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  const rid = req.header("x-request-id");

  console.error({
    rid,
    method: req.method,
    path: req.originalUrl,
    employeeId: req.context?.employeeId,
    roles: req.context?.roles,
    name: err instanceof Error ? err.name : "UnknownError",
    message: err instanceof Error ? err.message : String(err),
    details: (err as any)?.details,
    stack: err instanceof Error ? err.stack : undefined,
  });

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
      details: err.details,
      rid,
    });
  }

  return res.status(500).json({
    code: "INTERNAL_ERROR",
    message: "Internal Server Error",
    rid,
  });
}