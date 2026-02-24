import type { RoomOption } from '../dtos/room.dto';
import type { RoomRepoPort } from '../ports/room-repo.port';

export class GetActiveRoomsUseCase {
  constructor(
    private readonly roomRepo: RoomRepoPort,
  ) {}

  async execute(): Promise<RoomOption[]> {
    return this.roomRepo.findActiveRooms();
  }
}