const express = require("express");
const path = require("path");

const app = express();

app.disable("x-powered-by");

app.get("/healthz", (req, res) => {
  res.status(200).json({
    ok: true,
    service: "noobsbot-site",
    time: new Date().toISOString(),
  });
});

app.use(
  express.static(path.join(__dirname, "public"), { extensions: ["html"] })
);

app.use((req, res) => {
  res.status(404).type("text/plain").send("Not found");
});

module.exports = app;
