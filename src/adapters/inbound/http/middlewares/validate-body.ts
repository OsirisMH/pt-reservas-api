import type { RequestHandler } from 'express';
import z, { ZodType } from 'zod';
import { BadRequestError } from '../../../../core/application/errors/http.error';

export const validateBody = (schema: ZodType): RequestHandler => (req, _res, next) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    throw new BadRequestError("Invalid request body", {
      issues: parsed.error.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      })),
    });
  }

  req.body = parsed.data;
  next();
};
