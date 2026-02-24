import type { NextFunction, Request, Response } from "express";
import { env } from "../../../../config/env";

import { ForbiddenError } from "../../../../core/application/errors/http.error";

export function ensureInternal(req: Request, _res: Response, next: NextFunction) {
  const headerSecret = req.get("x-internal-auth");

  if (!headerSecret || headerSecret !== env.INTERNAL_AUTH_SECRET) {
    return next(
      new ForbiddenError("Invalid internal authentication header", {
        header: "x-internal-auth",
      })
    );
  }

  return next();
}