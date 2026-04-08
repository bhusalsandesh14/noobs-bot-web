# DirectAdmin + LiteSpeed Node.js Hosting Guide

This server uses **CloudLinux + LiteSpeed (Passenger)** to run Node.js apps.
LiteSpeed loads your app via `require()`, which means there are specific
constraints on how your code must be structured.

---

## What works

- **CommonJS** (`require` / `module.exports`)
- **Any framework** that exports an app object — Express, Fastify, Koa, etc.
- **Static files** served from `public/`
- **APIs and server-side rendering**

## What won't work without changes

- **ES Modules** (`import` / `export`, `"type": "module"` in package.json)
  — LiteSpeed's `lsnode.js` uses `require()` internally, so ES modules will
  crash with `ERR_REQUIRE_ESM`. Convert to CommonJS or use a bundler.
- **`app.listen()`** on its own — Passenger/LiteSpeed manages the port binding.
  You must export the app instead.

---

## Rules for any Node.js project on this hosting

1. Use `require()`, not `import`
2. Remove `"type": "module"` from `package.json`
3. Export your app: `module.exports = app`
4. Do **not** call `app.listen()` — Passenger does it for you

Follow these 4 rules and any Node.js project will work.

---

## Example `app.js`

```js
const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));

app.use((req, res) => {
  res.status(404).type("text/plain").send("Not found");
});

module.exports = app;
```

## Useful commands

```bash
# Activate node environment
source /home/noobsbot/nodevenv/noobsbot/18/bin/activate && cd /home/noobsbot/noobsbot

# Install dependencies
npm install

# Restart the app
touch tmp/restart.txt

# Check error logs
cat stderr.log
```
