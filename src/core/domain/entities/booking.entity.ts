import type { BookingStatus } from "../value-objects/booking-status"
import { BookingPolicy } from "../policies/booking.policy"

import type { ClockPort } from "../../shared/ports/clock.port"
import { BookingTooOldError, BookingTooShortError, InvalidBookingDateRangeError } from "../errors/booking.error"


export type PrimitiveBooking = {
  id?: number
  reference: string
  roomId: number
  departmentId: number
  requester: string
  title: string
  description?: string
  startsAt: Date
  endsAt: Date
  statusId: BookingStatus
  cancellationReason?: string
  // history: any;

  // audit fields
  createdAt?: Date
  updatedBy?: number
  updatedAt?: Date
  deletedAt?: Date
}

export class BookingEntity {
  private static readonly minDuration = 15;
  private static readonly graceTimeMinutes = 30;

  private constructor(
    private readonly reference: string,
    private readonly roomId: number,
    private readonly departmentId: number,
    private readonly requester: string,
    private readonly title: string,
    private readonly startsAt: Date,
    private readonly endsAt: Date,
    private readonly statusId: BookingStatus,
    private readonly cancellationReason?: string,
    private readonly createdAt?: Date,
    private readonly updatedBy?: number,
    private readonly updatedAt?: Date,
    private readonly deletedAt?: Date,
    private readonly id?: number,
    private readonly description?: string,
  ) {}

  static create(params: PrimitiveBooking, clock: ClockPort, noValidateAssertNotTooOld = false): BookingEntity {
    if (!noValidateAssertNotTooOld) this.assertNotTooOld(params.startsAt, clock);
    this.assertDuration(params.startsAt, params.endsAt);
    this.assertDateRange(params.startsAt, params.endsAt);


    return new BookingEntity(
      params.reference,
      params.roomId,
      params.departmentId,
      params.requester,
      params.title,
      params.startsAt,
      params.endsAt,
      params.statusId,
      params.cancellationReason,
      params.createdAt ?? new Date(),
      params.updatedBy,
      params.updatedAt,
      params.deletedAt,
      params.id,
      params.description,
    )
  }

  toValue(): PrimitiveBooking {
    return {
      id: this.id,
      reference: this.reference,
      roomId: this.roomId,
      departmentId: this.departmentId,
      requester: this.requester,
      title: this.title,
      description: this.description,
      startsAt: this.startsAt,
      endsAt: this.endsAt,
      statusId: this.statusId,
      cancellationReason: this.cancellationReason,    
      createdAt: this.createdAt,
      updatedBy: this.updatedBy,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    }
  }

  private static assertDuration(startsAt: Date, endsAt: Date) {
    const durationMs = endsAt.getTime() - startsAt.getTime();
    const minMs = this.minDuration * 60 * 1000;

    if (durationMs < minMs) {
      throw new BookingTooShortError(this.minDuration);
    }
  }

  private static assertDateRange(startsAt: Date, endsAt: Date) {
    if (startsAt >= endsAt) throw new InvalidBookingDateRangeError();
  }

  private static assertNotTooOld(startsAt: Date, clock: ClockPort) {
    const now = clock.now().getTime();
    const graceMs = BookingPolicy.PAST_GRACE_MINUTES * 60 * 1000;

    if (startsAt.getTime() < (now - graceMs)) {
      throw new BookingTooOldError();
    }
  }
}