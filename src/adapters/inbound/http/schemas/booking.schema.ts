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
    departmentId: z.coerce.number().int().positive(),
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

export const searchBookingsSchema = z
  .object({
    roomId: z.coerce.number().int().positive().optional(),
    departmentId: z.coerce.number().int().positive().optional(),
    statusId: z.coerce.number().int().positive().optional(),
    search: z.string().trim().optional(),
    startsAt: z.coerce.date().default(() => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      return d;
    }),
    endsAt: z.coerce.date().default(() => {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      d.setHours(23, 59, 59, 999);
      return d;
    }),
  })
  .refine(
    (data) => {
      if (!data.startsAt || !data.endsAt) return true;
      return data.startsAt < data.endsAt;
    },
    {
      message: 'startsAt must be before endsAt',
      path: ['endsAt'],
    }
  );


export type CreateBookingBody = z.infer<typeof createBookingSchema>;
export type SearchBookingsQuery = z.infer<typeof searchBookingsSchema>;
