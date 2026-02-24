// adapters/inbound/http/middlewares/ensure-credentials.ts
import type { NextFunction, Request, Response } from "express";
import { CredentialsSchema } from "../schemas/credentials.schema";
import { BadRequestError, UnauthorizedError } from "../../../../core/application/errors/http.error";

export function ensureCredentials(req: Request, _res: Response, next: NextFunction) {
  const raw = {
    employeeId: req.get("x-empleado-id"),
    email: req.get("x-correo"),
    roles: req.get("x-roles"),
  };

  if (!raw.employeeId || !raw.roles) {
    return next(
      new UnauthorizedError("Missing credentials", {
        required: ["x-empleado-id", "x-roles"],
      })
    );
  }

  const parsed = CredentialsSchema.safeParse(raw);
  if (!parsed.success) {
    return next(
      new BadRequestError("Invalid credentials headers", {
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      })
    );
  }

  req.context = {
    employeeId: parsed.data.employeeId,
    email: parsed.data.email,
    roles: parsed.data.roles,
    requestId: req.get("x-request-id") ?? undefined,
  };

  return next();
}