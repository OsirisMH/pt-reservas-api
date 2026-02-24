import type { RequestHandler } from 'express';
import { ZodType } from 'zod';

import { UnauthorizedError } from '../../../../core/application/errors/http.error';

export const validateHeaders =
  (schema: ZodType): RequestHandler =>
  (req, res, next) => {
    const parsed = schema.safeParse({
      authorization: req.header('authorization') ?? '',
    });

    if (!parsed.success) {
      throw new UnauthorizedError("Missing or invalid Authorization header", {
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      })
    }

    res.locals.auth = parsed.data;
    return next();
  };