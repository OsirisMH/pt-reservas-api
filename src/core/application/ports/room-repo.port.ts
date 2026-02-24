import type { RoomOption } from "../dtos/room.dto";

export interface RoomRepoPort {
  findActiveRooms(): Promise<RoomOption[]>;

  existsActive(roomId: number): Promise<boolean>;
}