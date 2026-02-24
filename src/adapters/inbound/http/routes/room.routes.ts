import { Router } from 'express';
import { RoomController } from '../controller/room.controller';
import { validateQuery } from '../middlewares/validate-query';
import { checkAvailabilitySchema } from '../schemas/room.schema';


export const buildRoomRoutes = (controller: RoomController) => {
  const r = Router();

  // Check room availability
  r.get("/availability", validateQuery(checkAvailabilitySchema), controller.checkRoomAvailabilityHandler);

  // Room list
  r.get('/', controller.getActiveRoomsHandler);


  return r;
};