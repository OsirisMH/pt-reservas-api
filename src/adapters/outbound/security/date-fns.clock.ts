// date-fns.clock.ts
import {
  addDays,
  addMinutes,
  addHours,
  isBefore,
  isAfter,
  isEqual,
  differenceInMinutes,
  differenceInHours,
  startOfDay,
  endOfDay,
} from "date-fns";

import type { ClockPort } from "../../../core/shared/ports/clock.port";

export class DateFnsClock implements ClockPort {
  now(): Date {
    return new Date();
  }

  addDays(date: Date, days: number): Date {
    return addDays(date, days);
  }

  addMinutes(date: Date, minutes: number): Date {
    return addMinutes(date, minutes);
  }

  addHours(date: Date, hours: number): Date {
    return addHours(date, hours);
  }

  isBefore(date: Date, compare: Date): boolean {
    return isBefore(date, compare);
  }

  isAfter(date: Date, compare: Date): boolean {
    return isAfter(date, compare);
  }

  isEqual(date: Date, compare: Date): boolean {
    return isEqual(date, compare);
  }

  differenceInMinutes(dateLeft: Date, dateRight: Date): number {
    return differenceInMinutes(dateLeft, dateRight);
  }

  differenceInHours(dateLeft: Date, dateRight: Date): number {
    return differenceInHours(dateLeft, dateRight);
  }

  startOfDay(date: Date): Date {
    return startOfDay(date);
  }

  endOfDay(date: Date): Date {
    return endOfDay(date);
  }
}