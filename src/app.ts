import { RequestContext } from "@mikro-orm/core";
import { fastify } from "fastify";
import { initORM } from "./db.js";
import { registerTaskRoutes } from "./modules/task/routes.js";

export async function bootstrap(port = 3001) {
  const db = await initORM();
  const app = fastify();

  // register request context hook
  app.addHook("onRequest", (request, reply, done) => {
    RequestContext.create(db.em, done);
  });

  // shut down the connection when closing the app
  app.addHook("onClose", async () => {
    await db.orm.close();
  });

  app.register(registerTaskRoutes, { prefix: "task" });

  const url = await app.listen({ port });

  return { app, url };
}
