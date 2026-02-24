import { pgTable, bigint, varchar, integer, timestamp, text } from 'drizzle-orm/pg-core';

export const rooms = pgTable('salas',  {
    id: bigint("id", { mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),

    name: varchar("nombre", { length: 120 }).notNull(),
    capacity: integer("capacidad").notNull(),
    description: text("descripcion"),

    createdBy: bigint("usuario_creacion_id", { mode: "number" }),
    createdAt: timestamp("fecha_creacion", { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedBy: bigint("usuario_modificacion_id", { mode: "number" }),
    updatedAt: timestamp("fecha_modificacion", { withTimezone: true }),

    deletedAt: timestamp("fecha_eliminacion", { withTimezone: true })
  },);