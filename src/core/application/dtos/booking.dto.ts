export type FutureBookRecord = {
  id: number;
  reference: string;
  roomId: number;
  requester: string;
  title: string;
  description: string | null;
  startsAt: Date;
  endsAt: Date;
  cancellationReason: string | null;
  statusId: number;
};