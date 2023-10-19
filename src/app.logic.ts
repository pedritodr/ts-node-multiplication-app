import path from "path";
import { argv } from "./config/plugins/argv.plugin";
const fs = require("fs");

const OUT_DIR = "outputs";

const { b: base, l: limit, s: show } = argv;

const header: string = `
==================================
        Tabla del ${base}
==================================
`;
let body: string = "\n";

for (let i = 0; i <= limit; i++) {
  body += `${base} x ${i} = ${base * i} \n`;
}

const outFilePath = path.join(OUT_DIR, `Multiplicacion x ${base}.txt`);
fs.mkdirSync(OUT_DIR, { recursive: true });

fs.writeFileSync(outFilePath, header + body);

console.log("File created: " + outFilePath);

if (show) {
  console.log(header + body);
}
