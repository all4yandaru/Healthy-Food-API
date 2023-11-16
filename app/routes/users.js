const express = require("express");
const { user } = require("../models");
const router = express.Router();
const allowedTo = require("../constants/permissions");
const { tokenAuth } = require("../middlewares/tokenAuth");
const { permissionCheck } = require("../middlewares/permissionAuth");

router.use(tokenAuth);

router.get("/", permissionCheck(allowedTo.BROWSE_USERS), (req, res) => {
  user.findAll().then((users) => {
    res.json(users);
  });
});

module.exports = router;
