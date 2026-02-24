import type { PrimitiveBooking } from "../../domain/entities/booking.entity";
import type { FutureBookRecord } from "../dtos/booking.dto";

export interface BookingRepoPort {
  findFutureByDateRange: (parmas: { start: Date, end: Date, now: Date }) => Promise<FutureBookRecord[]>

  existsOverlapping(params: { roomId: number; start: Date; end: Date }): Promise<boolean>;

  create(params: PrimitiveBooking): Promise<void>;
}