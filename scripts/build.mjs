import { mkdir, cp } from "node:fs/promises";
const root = new URL("../", import.meta.url);
await mkdir(new URL("dist/", root), { recursive: true });
for (const path of ["index.html", "styles.css", "app.js", "lib.js", "assets", "data"]) {
  await cp(new URL(path, root), new URL(`dist/${path}`, root), { recursive: true });
}
console.log("Built The Game to dist/. No dependencies, no bundler, no bloat.");
