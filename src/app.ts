import { argv } from "./config/plugins/argv.plugin";
import { ServerApp } from "./presentation/server-app";

(async () => {
  await main();
})();

async function main() {
  const { b: base, l: limit, s: show, d: destination, n: name } = argv;

  ServerApp.run({ base, limit, show, destination, name });
}
