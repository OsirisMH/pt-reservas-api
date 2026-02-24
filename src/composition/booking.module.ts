import type { AppContext } from './context';

import { DrizzleBookingRepository } from '../adapters/outbound/db/drizzle/repositories/drizzle-booking.repository';
import { DateFnsClock } from '../adapters/outbound/security/date-fns.clock';
import { GetFutureBookingsUseCase } from '../core/application/use-cases/get-future-bookings.usecase';
import { BookingController } from '../adapters/inbound/http/controller/booking.controller';
import { CreateBookingUseCase } from '../core/application/use-cases/create-booking.usecase';
import { DrizzleRoomRepository } from '../adapters/outbound/db/drizzle/repositories/drizzle-room.repository';

export const buildBookingModule = (ctx: AppContext) => {
  const bookingRepo = new DrizzleBookingRepository(ctx.db);
  const roomRepo = new DrizzleRoomRepository(ctx.db);
  const clock = new DateFnsClock();

  const getFutureBookings = new GetFutureBookingsUseCase(bookingRepo, clock);
  const createBooking = new CreateBookingUseCase(bookingRepo, roomRepo, clock);

  const controller = new BookingController(getFutureBookings, createBooking);

  return { controller };
};