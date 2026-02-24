import { z } from 'zod';

export const checkAvailabilitySchema = z
  .object({
    roomId: z.coerce.number().int().positive(),
    startsAt: z.coerce.date(),
    endsAt: z.coerce.date(),
  })

export type CheckAvailabilityQuery = z.infer<typeof checkAvailabilitySchema>;