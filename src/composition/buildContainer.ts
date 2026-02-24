import { buildBookingModule } from './booking.module';
import { buildContext } from './context';
import { buildDepartmentModule } from './department.module';
import { buildRoomModule } from './room.module';

export const buildContainer = async () => {
  const ctx = await buildContext();
  return {
    ctx,
    room: buildRoomModule(ctx),
    booking: buildBookingModule(ctx),
    department: buildDepartmentModule(ctx),
  };
};