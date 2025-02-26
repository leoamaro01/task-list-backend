import config from "../src/mikro-orm.config.js";
import { bootstrap } from "../src/app.js";
import { initORM } from "../src/db.js";
import { TestSeeder } from "../src/seeders/TestSeeder.js";

export async function initTestApp(port: number) {
  // this will create all the ORM services and cache them
  const { orm } = await initORM({
    ...config,
    debug: false,
    dbName: ":memory:",
    // preferTs: true,
  });

  // create the schema so we can use the database
  await orm.schema.createSchema();
  await orm.seeder.seed(TestSeeder);

  const { app } = await bootstrap(port, false);

  return app;
}
