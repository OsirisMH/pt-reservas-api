export interface ClockPort {
  now(): Date;

  addDays(date: Date, days: number): Date;
  addMinutes(date: Date, minutes: number): Date;
  addHours(date: Date, hours: number): Date;

  isBefore(date: Date, compare: Date): boolean;
  isAfter(date: Date, compare: Date): boolean;
  isEqual(date: Date, compare: Date): boolean;

  differenceInMinutes(dateLeft: Date, dateRight: Date): number;
  differenceInHours(dateLeft: Date, dateRight: Date): number;

  startOfDay(date: Date): Date;
  endOfDay(date: Date): Date;
}