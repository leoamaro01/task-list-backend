import {
  EntityManager,
  EntityRepository,
  MikroORM,
  Options,
} from "@mikro-orm/sqlite";
import { Task } from "./modules/task/task.entity.js";

export interface Services {
  orm: MikroORM;
  em: EntityManager;
  task: EntityRepository<Task>;
}

let cache: Services;

export async function initORM(options?: Options): Promise<Services> {
  if (cache) {
    return cache;
  }

  const orm = await MikroORM.init(options);

  // save to cache before returning
  return (cache = {
    orm,
    em: orm.em,
    task: orm.em.getRepository(Task),
  });
}
