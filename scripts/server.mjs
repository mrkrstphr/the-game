import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
function option(name, fallback) {
  const index = args.indexOf(name);
  return index !== -1 && args[index + 1] && !args[index + 1].startsWith("--") ? args[index + 1] : fallback;
}
const project = fileURLToPath(new URL("../", import.meta.url));
const root = resolve(project, args.includes("--dist") ? "dist" : ".");
const port = Number(option("--port", process.env.PORT || "5173"));
const host = option("--host", "127.0.0.1");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png" };

const server = http.createServer(async (req, res) => {
  try {
    if (!["GET", "HEAD"].includes(req.method)) {
      res.writeHead(405, { Allow: "GET, HEAD" }).end();
      return;
    }
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    const file = resolve(root, `.${pathname === "/" ? "/index.html" : pathname}`);
    const relative = file.slice(root.length + 1);
    const allowed = ["index.html", "styles.css", "app.js", "lib.js"].includes(relative)
      || ["assets", "data"].some(dir => relative.startsWith(dir + sep));
    if (!file.startsWith(root + sep) || !allowed || !(await stat(file)).isFile()) {
      res.writeHead(404).end("Not found");
      return;
    }
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream", "Cache-Control": "no-cache", "X-Content-Type-Options": "nosniff" });
    res.end(req.method === "HEAD" ? undefined : body);
  } catch (error) {
    res.writeHead(error.code === "ENOENT" || error.code === "ENOTDIR" ? 404 : 400).end("Not found");
  }
});
server.listen(port, host, () => console.log(`The Game is live at http://${host}:${port}`));
server.on("error", error => { console.error(error.message); process.exitCode = 1; });
