import type { RequestHandler } from "express";
import { z, ZodType } from "zod";
import { BadRequestError } from "../../../../core/application/errors/http.error";

export const validateQuery =
  <TSchema extends ZodType>(schema: TSchema): RequestHandler =>
  (req, _res, next) => {
    const parsed = schema.safeParse(req.query);

    if (!parsed.success) {
      throw new BadRequestError("Invalid query params", {
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      });
    }

    req.validatedQuery = parsed.data;
    return next();
  };