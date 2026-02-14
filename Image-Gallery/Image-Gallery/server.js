const http = require("http");
const fs = require("fs");
const path = require("path");

const desiredPort = process.env.PORT ? Number(process.env.PORT) : null;
const root = __dirname;

const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
};

function safeJoin(base, target) {
  const resolved = path.resolve(base, target.replace(/^[\\/]+/, ""));
  if (!resolved.startsWith(base)) return null;
  return resolved;
}

function createServer() {
  return http.createServer((req, res) => {
  const urlPath = decodeURI(req.url || "/");
  const requested = urlPath === "/" ? "index.html" : urlPath;
  const filePath = safeJoin(root, requested);
  if (!filePath) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }
  fs.stat(filePath, (err, stat) => {
    if (err) {
      res.statusCode = 404;
      res.end("Not Found");
      return;
    }
    let finalPath = filePath;
    if (stat.isDirectory()) {
      finalPath = path.join(filePath, "index.html");
    }
    const ext = path.extname(finalPath).toLowerCase();
    const type = types[ext] || "application/octet-stream";
    fs.readFile(finalPath, (readErr, data) => {
      if (readErr) {
        res.statusCode = 404;
        res.end("Not Found");
        return;
      }
      res.setHeader("Content-Type", type);
      res.statusCode = 200;
      res.end(data);
    });
  });
});
}

function start(portToUse) {
  const srv = createServer();
  srv.on("error", (err) => {
    if (err && err.code === "EADDRINUSE") {
      if (desiredPort !== null) {
        const fallback = createServer();
        fallback.listen(0, "0.0.0.0", () => {
          const actual = fallback.address().port;
          console.log(`Port ${desiredPort} busy; using http://localhost:${actual}/`);
        });
        fallback.on("error", (e) => {
          console.error(`Server error: ${e.message}`);
          process.exit(1);
        });
      } else {
        const retry = createServer();
        retry.listen(0, "0.0.0.0", () => {
          const actual = retry.address().port;
          console.log(`Server running at http://localhost:${actual}/`);
        });
        retry.on("error", (e) => {
          console.error(`Server error: ${e.message}`);
          process.exit(1);
        });
      }
    } else {
      console.error(`Server error: ${err.message}`);
      process.exit(1);
    }
  });
  srv.listen(portToUse, "0.0.0.0", () => {
    const actual = srv.address().port;
    console.log(`Server running at http://localhost:${actual}/`);
  });
}

start(desiredPort !== null ? desiredPort : 0);
