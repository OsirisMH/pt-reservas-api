export type BookingRecord = {
  id: number;
  roomId: number;
  departmentId: number;
  requester: string;
  title: string;
  description: string | null;
  startsAt: Date;
  endsAt: Date;
  cancellationReason: string | null;
  statusId: number;
}

export type BookingFilters = {
  roomId?: number;
  departmentId?: number;
  statusId?: number;
  search?: string;
  startsAt: Date;
  endsAt: Date;
};

export type FutureWindow = {
  now: Date;
  graceTimeMinutes: number;
};

export type FutureBookRecord = {
  id: number;
  room: { name: string };
  department: { name: string }; 
  requester: string;
  title: string;
  description: string | null;
  startsAt: Date;
  endsAt: Date;
  cancellationReason: string | null;
  statusId: number;
};