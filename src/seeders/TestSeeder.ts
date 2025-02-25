import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Task } from "../modules/task/task.entity.js";

export class TestSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Task, {
      checked: true,
      text: "@dev-team check this out!",
    });
    em.create(Task, {
      checked: false,
      text: "Someone email Sean at sean@business.com, he needs to know about this ASAP",
    });
  }
}
