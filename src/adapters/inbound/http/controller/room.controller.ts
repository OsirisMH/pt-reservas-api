import type { Request, Response, NextFunction } from 'express';
import type { GetActiveRoomsUseCase } from '../../../../core/application/use-cases/get-active-rooms.usecase';

export class RoomController {
  constructor(
    private readonly getActiveRooms: GetActiveRoomsUseCase,
  ) {}

  getActiveRoomsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.getActiveRooms.execute();
      res.status(200).json(result);
    } catch (e) { next(e); }
  };
}