import { createServer } from "https";
import { URL } from "url";
import { readFileSync } from "fs";
import next from "next";
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const sslOptions = {
  key: readFileSync("https_cert/localhost-key.pem"),
  cert: readFileSync("https_cert/localhost.pem"),
};
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer(sslOptions, async (req, res) => {
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
  })
  .catch({
    onerror: function (err) {
      console.log("Error", err);
    },
    onclose: function () {
      console.log("Closed");
    },
    onunhandledrejection: function (err) {
      console.log("Unhandled rejection", err);
    },
    onexit: function () {
      console.log("Exiting");
    },
    onready: function () {
      console.log("Ready");
    },
    onrequest: function () {
      console.log("Request");
    },
    onresponse: function () {
      console.log("Response");
    },
    onrequestend: function () {
      console.log("Request end");
    },
    onrequeststart: function () {
      console.log("Request start");
    },
    onrequesterror: function () {
      console.log("Request error");
    },
    onrequestheaders: function () {
      console.log("Request headers");
    },
    onrequestheaderscomplete: function () {
      console.log("Request headers complete");
    },
  });
