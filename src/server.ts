import { bootstrap } from "./app.js";
import { initORM } from "./db.js";
import { InitialSeeder } from "./seeders/InitialSeeder.js";

try {
  const { url } = await bootstrap(+(process.env.PORT || 8080));

  const db = await initORM();
  await db.orm.seeder.seed(InitialSeeder);

  console.log(`Server started at ${url}`);
} catch (e) {
  console.error(e);
}
