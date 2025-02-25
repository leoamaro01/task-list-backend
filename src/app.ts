import { MikroORM, RequestContext } from "@mikro-orm/core";
import { fastify } from "fastify";
import config from "./mikro-orm.config.js";

export async function bootstrap(port = 3001) {
  const orm = await MikroORM.init(config);
  const app = fastify();

  // register request context hook
  app.addHook("onRequest", (request, reply, done) => {
    RequestContext.create(orm.em, done);
  });

  // shut down the connection when closing the app
  app.addHook("onClose", async () => {
    await orm.close();
  });

  const url = await app.listen({ port });

  return { app, url };
}
