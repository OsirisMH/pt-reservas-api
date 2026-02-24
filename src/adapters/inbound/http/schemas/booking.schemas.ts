import { z } from 'zod';

export const createBookingSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters")
      .max(160, "Title is too long"),
    description: z
      .string()
      .trim()
      .max(500, "Description is too long")
      .optional()
      .or(z.literal("")),
    roomId: z.coerce.number().int().positive(),
    requester: z.coerce.string().min(1).max(120),
    startsAt: z.coerce.date(),
    endsAt: z.coerce.date(),
  })
  .refine((data) => data.startsAt < data.endsAt, {
    message: "startsAt must be before endsAt",
    path: ["endsAt"],
  })
  .refine(
    (data) =>
      (data.endsAt.getTime() - data.startsAt.getTime()) >= 15 * 60 * 1000,
    {
      message: "Minimum booking duration is 15 minutes",
      path: ["endsAt"],
    }
  );

export const getFutureBookingsSchema = z
  .object({
    start: z.coerce.date(),
    end: z.coerce.date(),
  })
  .refine(
    (data) => data.start < data.end,
    {
      message: "start must be before end",
      path: ["end"],
    }
  );

export type CreateBookingBody = z.infer<typeof createBookingSchema>;
export type GetFutureBookingsQuery = z.infer<typeof getFutureBookingsSchema>;