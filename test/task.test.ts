import { afterAll, beforeAll, expect, test } from "vitest";
import { FastifyInstance } from "fastify";
import { initTestApp } from "./utils.js";

let app: FastifyInstance;

beforeAll(async () => {
  // we use different ports to allow parallel testing
  app = await initTestApp(30001);
});

afterAll(async () => {
  // we close only the fastify app - it will close the database connection via onClose hook automatically
  await app.close();
});

test("list all tasks", async () => {
  // mimic the http request via `app.inject()`
  const res = await app.inject({
    method: "get",
    url: "/task",
  });

  // assert it was successful response
  expect(res.statusCode).toBe(200);

  // with expected shape
  expect(res.json()).toMatchObject({
    items: [
      {
        checked: true,
        text: "@dev-team check this out!",
      },
      {
        checked: false,
        text: "Someone email Sean at sean@business.com, he needs to know about this ASAP",
      },
    ],
    count: 2,
  });
});

test("insert a task, update it and remove it", async () => {
  const taskText = "This is a really cool test!";
  const res = await app.inject({
    method: "post",
    url: "/task",
    body: {
      text: taskText,
    },
  });

  expect(res.statusCode).toBe(201);

  expect(res.json()).toMatchObject({
    checked: false,
    text: taskText,
  });

  const id: number = res.json().id;

  const res2 = await app.inject({
    method: "patch",
    url: `/task/${id}`,
    body: {
      checked: true,
    },
  });

  expect(res2.statusCode).toBe(200);

  expect(res2.json()).toMatchObject({
    id: id,
    text: taskText,
    checked: true,
  });

  const res3 = await app.inject({
    method: "delete",
    url: `/task/${id}`,
  });

  expect(res3.statusCode).toBe(204);

  const res4 = await app.inject({
    method: "get",
    path: `/task/${id}`,
  });

  expect(res4.statusCode).toBe(404);
});

test("Try to create invalid task", async () => {
  const res = await app.inject({
    method: "post",
    url: "/task",
    body: {
      checked: true,
    },
  });

  expect(res.statusCode).toBe(400);
});
