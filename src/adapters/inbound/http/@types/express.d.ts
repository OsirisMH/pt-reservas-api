import type { RequestContext } from "../context/request-context";

declare global {
  namespace Express {
    interface Request {
      context?: RequestContext;
      validatedQuery?: unknown;
    }
  }
}

export {};