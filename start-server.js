const https = require("https");
const { URL } = require("url");
const fs = require("fs");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const sslOptions = {
  key: fs.readFileSync("https_cert/localhost-key.pem"),
  cert: fs.readFileSync("https_cert/localhost.pem"),
};
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = https.createServer(sslOptions, async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const baseURL = req.protocol + "://" + req.headers.host + "/";
      const parsedUrl = new URL(req.url, baseURL);
      const { pathname, query } = parsedUrl;

      if (pathname === "/a") {
        await app.render(req, res, "/a", query);
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });
  server.once("error", (err) => {
    console.error(err);
    process.exit(1);
  });
  server.listen(port, () => {
    console.log(`> Ready on https://${hostname}:${port}`);
  });
});
