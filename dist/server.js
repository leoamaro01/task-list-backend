import { MikroORM } from "@mikro-orm/sqlite"; // or any other driver package
import config from "./mikro-orm.config.js";
// initialize the ORM, loading the config file dynamically
const orm = await MikroORM.init(config);
// console.log(orm.em); // access EntityManager via `em` property
// console.log(orm.schema); // access SchemaGeneartor via `schema` property
// const task = new Task();
// task.text = "@dev-team check this out!";
// // first mark the entity with `persist()`, then `flush()`
// await orm.em.persist(task).flush();
// // after the entity is flushed, it becomes managed, and has the PK available
// console.log("user id is:", task.id);
