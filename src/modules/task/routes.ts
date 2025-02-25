import { FastifyInstance } from "fastify";
import { initORM } from "../../db.js";
import { EntityData } from "@mikro-orm/core";
import { Task } from "./task.entity.js";

export async function registerTaskRoutes(app: FastifyInstance) {
  const db = await initORM();

  app.get("/", async (request) => {
    const { limit, offset } = request.query as {
      limit?: number;
      offset?: number;
    };

    const [items, count] = await db.task.findAndCount(
      {},
      {
        limit,
        offset,
      },
    );

    return { items, count };
  });

  app.get("/:id", async (request, reply) => {
    const params = request.params as { id: string };
    const id = +params.id;

    const task = await db.task.findOne(id);

    if (!task) {
      reply.statusCode = 404;
      return;
    }

    return task;
  });

  app.post("/", async (request, reply) => {
    const body = request.body as EntityData<Task>;

    if (!body.text) {
      reply.statusCode = 400;
      return "Bad Request: Required field 'text' not included in request body";
    }

    const task = db.task.create({
      text: body.text,
      checked: body.checked ?? false,
    });

    await db.em.flush();

    reply.statusCode = 201;

    return task;
  });

  app.patch("/:id", async (request, reply) => {
    const params = request.params as { id: string };
    const body = request.body as EntityData<Task>;

    const id = +params.id;

    const task = await db.task.findOne(id);

    if (!task) {
      reply.statusCode = 404;
      return;
    }

    if (
      (body.text === null || task.text === body.text) &&
      (task.checked === null || task.checked === body.checked)
    ) {
      // Not-Modified
      reply.statusCode = 304;
    } else {
      task.text = body.text ?? task.text;
      task.checked = body.checked ?? task.checked;
    }

    await db.em.flush();

    return task;
  });

  app.delete("/:id", async (request, reply) => {
    const params = request.params as { id: string };
    const id = +params.id;

    const task = await db.task.findOne(id);

    if (!task) {
      reply.statusCode = 404;
      return reply;
    }

    await db.em.remove(task).flush();

    // No-Content
    reply.statusCode = 204;
  });
}
