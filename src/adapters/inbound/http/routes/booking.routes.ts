import { Router } from "express";

import { ensureCredentials } from "../middlewares/ensure-credentials";
import type { BookingController } from "../controller/booking.controller";
import { validateBody } from "../middlewares/validate-body";
import { createBookingSchema, getFutureBookingsSchema } from "../schemas/booking.schemas";
import { validateQuery } from "../middlewares/validate-query";

export const buildBookingRoutes = (controller: BookingController) => {
  const r = Router();

  // -------------------------
  // PUBLIC
  // -------------------------
  // Create booking request (public)
  r.post("/", validateBody(createBookingSchema), controller.createBookingHandler);

  // Search by reference/folio (public)
  r.get("/reference/:reference", controller.getByReferenceHandler);

  // List/search bookings summarized
  r.get("/summary", validateQuery(getFutureBookingsSchema), controller.getBookingsSummaryHandler);

  // -------------------------
  // PRIVATE
  // -------------------------
  r.use(ensureCredentials);

  // List/search bookings (admin/private)
  r.get("/", controller.getBookingsHandler);

  // Update booking status (approve/cancel/block/etc.)
  r.patch("/:id/status", controller.updateStatusHandler);

  // Update booking fields
  r.patch("/:id", controller.updateBookingHandler);

  return r;
};