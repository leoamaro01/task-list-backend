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

  // In production this would be hanlded by a script
  // that a human manually calls after checking
  // that schema update queries aren't destructive
  // Or even better, a migration would be used.
  orm.schema.updateSchema();

  // save to cache before returning
  return (cache = {
    orm,
    em: orm.em,
    task: orm.em.getRepository(Task),
  });
}
