const {tokenAuth} = require("../middlewares/tokenAuth");
const express = require("express");
const { user } = require("../models");
const router = express.Router();

router.use(tokenAuth);

router.get("/", (req, res) => {
  user.findAll().then((users) => {
    res.json(users);
  });
});

module.exports = router;
