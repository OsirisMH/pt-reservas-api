import type { Request, Response, NextFunction } from 'express';
import type { GetActiveRoomsUseCase } from '../../../../core/application/use-cases/get-active-rooms.usecase';
import type { CheckAvailabilityQuery } from '../schemas/room.schema';
import type { CheckRoomAvailabiltyUseCase } from '../../../../core/application/use-cases/check-room-availability.usecase';

export class RoomController {
  constructor(
    private readonly getActiveRooms: GetActiveRoomsUseCase,
    private readonly checkRoomAvailability: CheckRoomAvailabiltyUseCase,
  ) {}

  getActiveRoomsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.getActiveRooms.execute();
      res.status(200).json(result);
    } catch (e) { next(e); }
  };

  checkRoomAvailabilityHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.validatedQuery as CheckAvailabilityQuery; 
      const result = await this.checkRoomAvailability.execute(query);
      res.status(200).json(result);
    } catch (e) { next(e); }
  };
}