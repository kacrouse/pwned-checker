require("dotenv").config();
const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get(
  "/hibp/*",
  (req, res, next) => {
    req.headers["hibp-api-key"] = process.env.HIBP_KEY;
    req.headers["user-agent"] = "kcrouse-gntc";
    next();
  },
  createProxyMiddleware({
    target: "https://haveibeenpwned.com/api/v3",
    pathRewrite: {
      "^/hibp": "",
    },
    changeOrigin: true,
    // don't verify SSL certs
    secure: false,
  })
);

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, function () {
  console.error(`Listening on port ${PORT}`);
});
