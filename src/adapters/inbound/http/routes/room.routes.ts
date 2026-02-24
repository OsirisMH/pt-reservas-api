import { Router } from 'express';
import { RoomController } from '../controller/room.controller';
import { ensureCredentials } from '../middlewares/ensure-credentials';


export const buildRoomRoutes = (controller: RoomController) => {
  const r = Router();
  r.get('/', controller.getActiveRoomsHandler);

  return r;
};