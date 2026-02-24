import { Router } from "express";

import { ensureCredentials } from "../middlewares/ensure-credentials";
import type { BookingController } from "../controller/booking.controller";
import { validateBody } from "../middlewares/validate-body";
import { createBookingSchema, searchBookingsSchema } from "../schemas/booking.schema";
import { validateQuery } from "../middlewares/validate-query";

export const buildBookingRoutes = (controller: BookingController) => {
  const r = Router();

  // PUBLIC
  r.post("/", validateBody(createBookingSchema), controller.createBookingHandler);
  r.get("/search", validateQuery(searchBookingsSchema), controller.searchBookingsHandler);
  r.get("/reference/:reference", controller.getByReferenceHandler);


  // PRIVATE
  r.use(ensureCredentials);
  r.get("/", controller.getBookingsHandler);
  r.patch("/:id/status", controller.updateStatusHandler);
  r.patch("/:id", controller.updateBookingHandler);

  return r;
};