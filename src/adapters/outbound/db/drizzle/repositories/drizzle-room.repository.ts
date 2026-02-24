import { drizzle } from 'drizzle-orm/postgres-js';
import { and, eq, isNull, notExists } from 'drizzle-orm';

import { rooms } from '../schemas/rooms.schema';
import { bookings } from '../schemas/bookings.schema';

import type { RoomRepoPort } from '../../../../../core/application/ports/room-repo.port';
import type { RoomOption } from '../../../../../core/application/dtos/room.dto';

export class DrizzleRoomRepository implements RoomRepoPort {
  constructor(private readonly db: ReturnType<typeof drizzle>) {}

  async findActiveRooms(): Promise<RoomOption[]> {
    const rows = await this.db
      .select({
        id: rooms.id,
        name: rooms.name,
        description: rooms.description,
        capacity: rooms.capacity,
      })
      .from(rooms)
      .where(isNull(rooms.deletedAt));

    return rows;
  }

  async existsActive(roomId: number): Promise<boolean> {
    const rows = await this.db
      .select({ id: rooms.id })
      .from(rooms)
      .where(and(isNull(rooms.deletedAt), eq(rooms.id, roomId)))
      .limit(1);

    return !!rows.length;
  }
}