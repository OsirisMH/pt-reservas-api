import { Router } from 'express';

import { errorHandler } from './middlewares/error-handler';
import { ensureCredentials } from './middlewares/ensure-credentials';

import type { RoomController } from './controller/room.controller';
import type { BookingController } from './controller/booking.controller';
import type { DepartmentController } from './controller/department.controller';

import { buildRoomRoutes } from './routes/room.routes';
import { buildBookingRoutes } from './routes/booking.routes';
import { buildDepartmentRoutes } from './routes/departments.routes';

export const buildRoutes = (controllers: {
  room: RoomController,
  booking: BookingController,
  department: DepartmentController
}) => {
  const r = Router();

  r.use('/me', ensureCredentials, (req, res) => { res.json(req.context) });
  r.use('/rooms', buildRoomRoutes(controllers.room));
  r.use('/departments', buildDepartmentRoutes(controllers.department));
  r.use('/bookings', buildBookingRoutes(controllers.booking));

  r.use(errorHandler);

  return r;
};