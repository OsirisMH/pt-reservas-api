import type { PrimitiveBooking } from "../../domain/entities/booking.entity";
import type { BookingFilters, BookingRecord, FutureWindow } from "../dtos/booking.dto";

export interface BookingRepoPort {
  searchBookings: (params: BookingFilters, window: FutureWindow) => Promise<BookingRecord[]>
  existsOverlapping(params: { roomId: number; start: Date; end: Date }): Promise<boolean>;
  create(params: PrimitiveBooking): Promise<void>;
  updateByReference(reference: string, payload: PrimitiveBooking): Promise<void>;
  getByReference(reference: string): Promise<BookingRecord | null | undefined>;
}