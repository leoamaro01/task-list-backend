import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Task } from "../modules/task/task.entity.js";

export class InitialSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Task, {
      checked: true,
      text: "@dev-team check this out! #URGENT",
    });
    em.create(Task, {
      checked: false,
      text: "Someone email Sean at sean@business.com, he needs to know about google.com ASAP",
    });
  }
}
