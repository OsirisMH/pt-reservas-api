import type { BookingRepoPort } from '../ports/booking-repo.port';
import type { ClockPort } from '../../shared/ports/clock.port';

import { BadRequestError } from '../errors/http.error';

type Input = { start: Date, end: Date };

export class GetFutureBookingsUseCase {
  constructor(
    private readonly bookingRepo: BookingRepoPort,
    private readonly clock: ClockPort
  ) {}

  async execute(input: Input): Promise<any[]> {
    const { start, end } = input;
    console.log(start, end)

    if (this.clock.isBefore(end, start)) throw new BadRequestError('Invalid date range');

    const bookings = await this.bookingRepo.findFutureByDateRange({
      start,
      end,
      now: this.clock.now(),
    });

    return bookings;
  }
}