import type { AppContext } from './context';

import { GetActiveRoomsUseCase } from '../core/application/use-cases/get-active-rooms.usecase';

import { DrizzleRoomRepository } from '../adapters/outbound/db/drizzle/repositories/drizzle-room.repository';

import { RoomController } from '../adapters/inbound/http/controller/room.controller';
import { CheckRoomAvailabiltyUseCase } from '../core/application/use-cases/check-room-availability.usecase';
import { DrizzleBookingRepository } from '../adapters/outbound/db/drizzle/repositories/drizzle-booking.repository';
import { DateFnsClock } from '../adapters/outbound/security/date-fns.clock';

export const buildRoomModule = (ctx: AppContext) => {
  const bookingRepo = new DrizzleBookingRepository(ctx.db);
  const roomRepo = new DrizzleRoomRepository(ctx.db);
  const clock = new DateFnsClock();
  
  const getActiveRooms = new GetActiveRoomsUseCase(roomRepo);
  const checkRoomAvailability = new CheckRoomAvailabiltyUseCase(bookingRepo, roomRepo);

  const controller = new RoomController(getActiveRooms, checkRoomAvailability);

  return { controller };
};