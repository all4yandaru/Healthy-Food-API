const express = require("express");
const router = express.Router();
const allowedTo = require("../constants/permissions");
const { tokenAuth } = require("../middlewares/tokenAuth");
const { permissionCheck } = require("../middlewares/permissionAuth");

router.use(tokenAuth);

router.get("/", (req, res) => {
  res.json("categories");
});

module.exports = router;
