import type { BookingRepoPort } from '../ports/booking-repo.port';
import type { BookingRecord } from '../dtos/booking.dto';
import { NotFoundError } from '../errors/http.error';

export class GetBookingsByReferenceUseCase {
  constructor(
    private readonly bookingRepo: BookingRepoPort,
  ) {}

  async execute(reference: string): Promise<BookingRecord> {
    const bookings = await this.bookingRepo.getByReference(reference);

    if (!bookings) throw new NotFoundError('Booking not found');
    return bookings;
  }
}