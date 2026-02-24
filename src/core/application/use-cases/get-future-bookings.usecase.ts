import type { BookingRepoPort } from '../ports/booking-repo.port';
import type { ClockPort } from '../../shared/ports/clock.port';
import type { BookingFilters } from '../dtos/booking.dto';
import { BookingPolicy } from '../../domain/policies/booking.policy';

export class SearchBookingsUseCase {
  constructor(
    private readonly bookingRepo: BookingRepoPort,
    private readonly clock: ClockPort,
  ) {}

  async execute(input: BookingFilters): Promise<any[]> {
    const bookings = await this.bookingRepo.searchBookings(input, {
      now: this.clock.now(),
      graceTimeMinutes: BookingPolicy.PAST_GRACE_MINUTES,
    });

    return bookings;
  }
}