import type { BookingRepoPort } from '../ports/booking-repo.port';
import type { RoomRepoPort } from '../ports/room-repo.port';
import type { ClockPort } from '../../shared/ports/clock.port';

import { BookingEntity } from '../../domain/entities/booking.entity';
import { BookingStatus } from '../../domain/value-objects/booking-status';

import { ConflictError, NotFoundError } from '../errors/http.error';

export type CreateBookingInput = {
  title: string;
  description?: string;
  roomId: number;
  departmentId: number;
  requester: string;
  startsAt: Date;
  endsAt: Date;
};

export class CreateBookingUseCase {
  constructor(
    private readonly bookingRepo: BookingRepoPort,
    private readonly roomRepo: RoomRepoPort,
    private readonly clock: ClockPort,
  ) {}

  async execute(input: CreateBookingInput): Promise<string> {
    const { title, description, roomId, departmentId, requester, startsAt, endsAt } = input;

    const roomOk = await this.roomRepo.existsActive(roomId);
    if (!roomOk) throw new NotFoundError('Room not found');

    const reference = this.generateReference();
    const booking = BookingEntity.create({
      reference,
      title,
      description,
      roomId,
      departmentId,
      requester,
      startsAt,
      endsAt,
      statusId: BookingStatus.Pending,
    }, this.clock)

    const newBooking = booking.toValue();
    const hasConflict = await this.bookingRepo.existsOverlapping({
      roomId: newBooking.roomId,
      start: newBooking.startsAt,
      end: newBooking.endsAt,
    });
    if (hasConflict) throw new ConflictError('Room is not available');

    await this.bookingRepo.create(newBooking);

    return newBooking.reference;
  }

  private generateReference(): string {
    const date = new Date();
    const y = String(date.getFullYear());
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `BK-${y}${m}${d}-${rand}`;
  }
}