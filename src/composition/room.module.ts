import type { AppContext } from './context';

import { GetActiveRoomsUseCase } from '../core/application/use-cases/get-active-rooms.usecase';

import { DrizzleRoomRepository } from '../adapters/outbound/db/drizzle/repositories/drizzle-room.repository';

import { RoomController } from '../adapters/inbound/http/controller/room.controller';

export const buildRoomModule = (ctx: AppContext) => {
  const roomRepo = new DrizzleRoomRepository(ctx.db);
  
  const getActiveRooms = new GetActiveRoomsUseCase(roomRepo);

  const controller = new RoomController(getActiveRooms);

  return { controller };
};