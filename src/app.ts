import { RequestContext } from "@mikro-orm/core";
import { fastify } from "fastify";
import { initORM } from "./db.js";
import { registerTaskRoutes } from "./modules/task/routes.js";
import config from "./mikro-orm.config.js";
import cors from "@fastify/cors";

export async function bootstrap(port = 30001, useCors = true) {
  const db = await initORM(config);

  // In production this would be hanlded by a script
  // that a human manually calls after checking
  // that schema update queries aren't destructive
  // Or even better, a migration would be used.
  await db.orm.schema.updateSchema();

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

  if (useCors)
    // in production this would also allow the front end url
    app.register(cors, {
      origin: (origin, cb) => {
        const hostname = new URL(origin!).hostname;
        if (hostname === "localhost") {
          //  Request from localhost will pass
          cb(null, true);
          return;
        }
        // Generate an error on other origins, disabling access
        cb(new Error("Not allowed"), false);
      },
    });

  const url = await app.listen({ port });

  return { app, url };
}
