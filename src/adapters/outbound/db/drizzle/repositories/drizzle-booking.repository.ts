import { drizzle } from 'drizzle-orm/postgres-js';
import { and, eq, gt, ilike, isNull, lt, ne, sql } from 'drizzle-orm';

import { bookings } from '../schemas/bookings.schema';
import { BookingStatus } from '../../../../../core/domain/value-objects/booking-status';

import type { BookingRepoPort } from '../../../../../core/application/ports/booking-repo.port';
import type { BookingFilters, BookingRecord, FutureBookRecord, FutureWindow } from '../../../../../core/application/dtos/booking.dto';
import type { PrimitiveBooking } from '../../../../../core/domain/entities/booking.entity';

export class DrizzleBookingRepository implements BookingRepoPort {
  constructor(private readonly db: ReturnType<typeof drizzle>) {}

  async searchBookings(params: BookingFilters, window: FutureWindow): Promise<BookingRecord[]> {
    const graceMs = window.graceTimeMinutes * 60_000;
    const minNow = new Date(window.now.getTime() - graceMs);

    const where = and(
      isNull(bookings.deletedAt),
      gt(bookings.endsAt, minNow),

      lt(bookings.startsAt, params.endsAt),
      gt(bookings.endsAt, params.startsAt),

      ne(bookings.statusId, BookingStatus.Cancelled),

      params.roomId ? eq(bookings.roomId, params.roomId) : undefined,
      params.departmentId ? eq(bookings.departmentId, params.departmentId) : undefined,
      params.statusId ? eq(bookings.statusId, params.statusId) : undefined,
      params.search?.trim()
        ? ilike(
            sql`${bookings.requester} || ' ' || ${bookings.title} || ' ' || coalesce(${bookings.description}, '')`,
            `%${params.search.trim()}%`
          )
        : undefined
    );

    const rows = await this.db
      .select({
        id: bookings.id,
        reference: bookings.reference,
        roomId: bookings.roomId,
        departmentId: bookings.departmentId,
        requester: bookings.requester,
        title: bookings.title,
        description: bookings.description,
        startsAt: bookings.startsAt,
        endsAt: bookings.endsAt,
        cancellationReason: bookings.cancellationReason,
        statusId: bookings.statusId,
      })
      .from(bookings)
      .where(where);

    return rows;
  }

  async create(params: PrimitiveBooking): Promise<void> {
    await this.db.insert(bookings).values({
      reference: params.reference,
      roomId: params.roomId,
      departmentId: params.departmentId,
      requester: params.requester,
      title: params.title,
      description: params.description,
      startsAt: params.startsAt,
      endsAt: params.endsAt,
      statusId: params.statusId,
      createdAt: params.createdAt ?? new Date(),
    });

  }

  async existsOverlapping(params: { roomId: number; start: Date; end: Date; }): Promise<boolean> {
    const rows = await this.db
      .select({ id: bookings.id })
      .from(bookings)
      .where(
        and(
          eq(bookings.roomId, params.roomId),
          isNull(bookings.deletedAt),
          ne(bookings.statusId, BookingStatus.Cancelled),
          lt(bookings.startsAt, params.end),
          gt(bookings.endsAt, params.start)
        )
      )
      .limit(1);

    return rows.length > 0;
  }

  async getByReference(reference: string): Promise<BookingRecord | null | undefined> {
    const row = await this.db
      .select({
        id: bookings.id,
        reference: bookings.reference,
        roomId: bookings.roomId,
        departmentId: bookings.departmentId,
        requester: bookings.requester,
        title: bookings.title,
        description: bookings.description,
        startsAt: bookings.startsAt,
        endsAt: bookings.endsAt,
        cancellationReason: bookings.cancellationReason,
        statusId: bookings.statusId,
      })
      .from(bookings)
      .where(
        eq(bookings.reference, reference)
      )
      .limit(1);

    if (!row.length) {
      return null;
    }

    return row[0];
  }

  async updateByReference(reference: string, payload: PrimitiveBooking): Promise<void> {
    await this.db
      .update(bookings)
      .set({
        ...payload,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(bookings.reference, reference),
          isNull(bookings.deletedAt),
        )
      )
      .returning({ id: bookings.id });
  }
}