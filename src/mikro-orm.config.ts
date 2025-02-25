import { Options, SqliteDriver } from "@mikro-orm/sqlite";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { Task } from "./modules/task/task.entity.js";
import { SeedManager } from "@mikro-orm/seeder";

const config: Options = {
  // for simplicity, we use the SQLite database, as it's available pretty much everywhere
  driver: SqliteDriver,
  dbName: "sqlite.db",
  // folder-based discovery setup, using common filename suffix
  entities: [Task],
  // we will use the ts-morph reflection, an alternative to the default reflect-metadata provider
  // check the documentation for their differences: https://mikro-orm.io/docs/metadata-providers
  metadataProvider: TsMorphMetadataProvider,
  // enable debug mode to log SQL queries and discovery information
  debug: false,
  extensions: [SeedManager],
};

export default config;
