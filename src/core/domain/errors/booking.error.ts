import { DomainError } from "./domain.error";

export class BookingTooShortError extends DomainError {
  constructor(minMinutes: number) {
    super(`Minimum booking duration is ${minMinutes} minutes`);
  }
}
export class InvalidBookingDateRangeError extends DomainError {
  constructor() {
    super("startsAt must be before endsAt");
  }
}

export class BookingInPastError extends DomainError {
  constructor() {
    super("Cannot create booking in the past");
  }
}