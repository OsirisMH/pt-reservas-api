// app.ts
import { buildContainer } from "./composition/buildContainer";
import { buildRoutes } from "./adapters/inbound/http/routes";
import { Server } from "./server";

(() => {
  main();
})();

async function main() {
  const { ctx, room, booking, department } = await buildContainer();

  const server = new Server({
    port: ctx.port,
    routes: buildRoutes({
      room: room.controller,
      booking: booking.controller,
      department: department.controller
    }),
    onShutdown: ctx.onShutdown,
  });

  server.start();
}