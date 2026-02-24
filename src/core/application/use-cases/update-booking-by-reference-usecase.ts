import type { BookingRepoPort } from '../ports/booking-repo.port';
import type { RoomRepoPort } from '../ports/room-repo.port';
import type { ClockPort } from '../../shared/ports/clock.port';

import { BookingEntity } from '../../domain/entities/booking.entity';
import { BookingStatus } from '../../domain/value-objects/booking-status';

import { ConflictError, NotFoundError } from '../errors/http.error';

export type UpdateBookingInput = {
  reference: string,
  title: string;
  description?: string;
  roomId: number;
  departmentId: number;
  requester: string;
  startsAt: Date;
  endsAt: Date;
  statusId: number;
  cancellationReason?: string;
};

export class UpdateBookingByReferenceUseCase {
  constructor(
    private readonly bookingRepo: BookingRepoPort,
    private readonly roomRepo: RoomRepoPort,
    private readonly clock: ClockPort,
  ) {}

  async execute(input: UpdateBookingInput): Promise<void> {
    const { reference, title, description, roomId, departmentId, requester, startsAt, endsAt, statusId } = input;

    const roomOk = await this.roomRepo.existsActive(roomId);
    if (!roomOk) throw new NotFoundError('Room not found');

    const booking = BookingEntity.create({
      reference,
      title,
      description,
      roomId,
      departmentId,
      requester,
      startsAt,
      endsAt,
      statusId,
    }, this.clock, true)

    const newBooking = booking.toValue();
    const hasConflict = await this.bookingRepo.existsOverlapping({
      roomId: newBooking.roomId,
      start: newBooking.startsAt,
      end: newBooking.endsAt,
    });
    if (hasConflict) throw new ConflictError('Room is not available');

    await this.bookingRepo.updateByReference(reference, newBooking);
  }
}