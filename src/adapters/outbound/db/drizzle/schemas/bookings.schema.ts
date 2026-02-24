import { pgTable, bigint, varchar, integer, timestamp, text } from 'drizzle-orm/pg-core';
import { rooms } from './rooms.schema';

export const bookings = pgTable('reservas',   {
    id: bigint("id", { mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),

    reference: varchar("folio", { length: 40 }).notNull(),

    roomId: bigint("sala_id", { mode: "number" })
      .notNull()
      .references(() => rooms.id),

    requester: varchar("solicitante", { length: 120 }).notNull(),

    title: varchar("titulo", { length: 160 }).notNull(),
    description: text("descripcion"),

    startsAt: timestamp("inicia_en", { withTimezone: true }).notNull(),
    endsAt: timestamp("termina_en", { withTimezone: true }).notNull(),

    statusId: integer("estatus_id").notNull(), 
    cancellationReason: text("motivo_cancelacion"),

    createdAt: timestamp("fecha_creacion", { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedBy: bigint("usuario_modificacion_id", { mode: "number" }),
    updatedAt: timestamp("fecha_modificacion", { withTimezone: true }),

    deletedAt: timestamp("fecha_eliminacion", { withTimezone: true })
  });