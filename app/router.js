const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
// const { tokenAuth } = require("./middlewares/token-auth");

const routesDir = path.join(__dirname, "routes");

// router.use(tokenAuth);

fs.readdirSync(routesDir).forEach((file) => {
  const routePath = path.join(routesDir, file);
  const route = require(routePath);
  const routeName = path.basename(file, ".js");

  router.use(`/${routeName}`, route);
});

module.exports = router;
