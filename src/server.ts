import { bootstrap } from "./app.js";

try {
  const { url } = await bootstrap();
  console.log(`Server started at ${url}`);
} catch (e) {
  console.error(e);
}
