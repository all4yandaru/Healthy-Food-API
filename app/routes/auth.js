const { user, token } = require("../models");
const randomString = require("randomstring");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  user
    .scope("withPassword")
    .findOne({ where: { email: req.body.email } })
    .then(async (user) => {
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (user && isPasswordCorrect) {
        const randomToken = randomString.generate();
        token.create({
          userId: user.id,
          token: randomToken,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        res.status(200).json({ user: user, token: randomToken });
      } else {
        res
          .status(401)
          .json({ status: 401, message: "email or password is wrong" });
      }
    });
});

module.exports = router;
