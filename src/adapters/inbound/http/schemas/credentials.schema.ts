import { z } from "zod";

const RolesCsvSchema = z
  .string()
  .min(1, "x-roles is required")
  .transform((value) =>
    value
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean)
      .map((r) => r.toUpperCase())
  )
  .refine((roles) => roles.length > 0, "x-roles must contain at least one role");

export const CredentialsSchema = z.object({
  employeeId: z
    .string()
    .min(1, "x-usuario-id is required")
    .transform((v) => Number(v))
    .refine((n) => Number.isFinite(n) && n > 0, "x-usuario-id must be a positive number"),
  email: z.email(),
  roles: RolesCsvSchema,
});

export type Credentials = z.infer<typeof CredentialsSchema>;