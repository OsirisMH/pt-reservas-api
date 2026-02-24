import type { BookingRepoPort } from '../ports/booking-repo.port';
import type { RoomRepoPort } from '../ports/room-repo.port';
import type { ClockPort } from '../../shared/ports/clock.port';
import { BadRequestError, ConflictError, NotFoundError } from '../errors/http.error';

type Input = { roomId: number, startsAt: Date, endsAt: Date };
type Output = { isAvailable: boolean };

export class CheckRoomAvailabiltyUseCase {
  constructor(
    private readonly bookingRepo: BookingRepoPort,
    private readonly roomRepo: RoomRepoPort,
  ) {}

  async execute(input: Input): Promise<Output> {
    const { roomId, startsAt, endsAt } = input;
    
    // Room validation
    const room = await this.roomRepo.existsActive(roomId);
    if (!room) throw new NotFoundError('Room not found')
    
    // 5) Conflictos (traslapes)
    const hasOverlap = await this.bookingRepo.existsOverlapping({ roomId, start: startsAt, end: endsAt });
    return { isAvailable: !hasOverlap };
  }
}