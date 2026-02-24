import { drizzle } from 'drizzle-orm/postgres-js';
import { and, eq, gt, isNull, lt, ne } from 'drizzle-orm';

import { bookings } from '../schemas/bookings.schema';
import { BookingStatus } from '../../../../../core/domain/value-objects/booking-status';

import type { BookingRepoPort } from '../../../../../core/application/ports/booking-repo.port';
import type { FutureBookRecord } from '../../../../../core/application/dtos/booking.dto';
import type { PrimitiveBooking } from '../../../../../core/domain/entities/booking.entity';

export class DrizzleBookingRepository implements BookingRepoPort {
  constructor(private readonly db: ReturnType<typeof drizzle>) {}

  async findFutureByDateRange(params: { start: Date, end: Date, now: Date }): Promise<FutureBookRecord[]> {
    const rows = await this.db
      .select({
        id: bookings.id,
        reference: bookings.reference,
        roomId: bookings.roomId,
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
        and(
          isNull(bookings.deletedAt),
          gt(bookings.endsAt, params.now),
          lt(bookings.startsAt, params.end),
          gt(bookings.endsAt, params.start),
          ne(bookings.statusId, BookingStatus.Cancelled)
        )
      );

    return rows;
  }

  async create(params: PrimitiveBooking): Promise<void> {
    await this.db.insert(bookings).values({
      reference: params.reference,
      roomId: params.roomId,
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
}