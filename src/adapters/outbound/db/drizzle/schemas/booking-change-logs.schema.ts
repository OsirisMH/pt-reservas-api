import { pgTable, bigint, varchar, timestamp, text, jsonb } from 'drizzle-orm/pg-core';
import { bookings } from './bookings.schema';

export const bookingChangeLogs = pgTable('historial_cambios_reservas', {
  id: bigint("id", { mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),

  bookingId: bigint("reserva_id", { mode: "number" })
    .notNull()
    .references(() => bookings.id, { onDelete: "cascade" }),

  actorUserId: bigint("actor_empleado_id", { mode: "number" }).notNull(),

  event: varchar("evento", { length: 40 }).notNull(),
  comment: text("comentario"),

  before: jsonb("before"),
  after: jsonb("after"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull()
});