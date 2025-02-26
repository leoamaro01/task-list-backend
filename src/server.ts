import { bootstrap } from "./app.js";

try {
  const { url } = await bootstrap(+(process.env.PORT || 8080));
  console.log(`Server started at ${url}`);
} catch (e) {
  console.error(e);
}
