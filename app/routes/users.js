const express = require("express");
const { user, token } = require("../models");
const router = express.Router();
const allowedTo = require("../constants/permissions");
const { tokenAuth } = require("../middlewares/tokenAuth");
const { permissionCheck } = require("../middlewares/permissionAuth");
const {
  UserRegisterValidator,
  UserUpdateValidator,
} = require("../supports/validator/UserValidator");
const bcrypt = require("bcrypt");
require("dotenv").config();

// REGISTER ===============================================================================
router.post(
  "/register",
  new UserRegisterValidator().validate(),
  async (req, res) => {
    const roleId = req.body.roleId;
    if (roleId != 1 && roleId != 2) {
      res.send("role must be 1 or 2");
    }
    req.body.createdAt = new Date();
    req.body.updatedAt = new Date();
    await user.create(req.body).then(() => {
      res.status(200).send("user added successfully");
    });
  }
);

// NEED AUTHORIZATION =====================================================================
router.use(tokenAuth);

// GET ALL USERS (ADMIN ONLY) =============================================================
router.get("/", permissionCheck(allowedTo.BROWSE_USERS), async (req, res) => {
  await user.findAll({ include: "role" }).then((users) => {
    res.json(users);
  });
});

// GET OWN USER DATA BY ID ================================================================
router.get("/:id", async (req, res) => {
  // get token data
  const tokenData = await token.findOne({
    where: { token: req.headers["authorization"] },
    include: "user",
  });

  // check id
  const idUser = parseInt(req.params.id);
  if (tokenData.user.id === idUser) {
    const userData = await user.scope("withPassword").findOne({
      where: { id: idUser },
    });
    res.json(userData);
  } else {
    res.send("You are not allowed to access other users data");
  }
});

// UPDATE USER BY ID ===================================================================
router.post(
  "/update/:id",
  new UserUpdateValidator().validate(),
  async (req, res) => {
    // mendapatkan user data dari token
    const tokenData = await token.findOne({
      where: { token: req.headers["authorization"] },
      include: "user",
    });

    // cheking user data dengan body
    const idUser = parseInt(req.params.id);
    if (tokenData.user.id === idUser) {
      const userData = await user.scope("withPassword").findOne({
        where: { id: idUser, email: req.body.email },
      });

      if (userData !== null) {
        // Change all data
        userData.name = req.body.name;
        userData.email = req.body.newEmail;
        userData.phone = req.body.phone;
        userData.updatedAt = new Date();
        // encrypt password
        bcrypt
          .hash(req.body.password, parseInt(process.env.BCRYPT_ROUND) || 10)
          .then((hash) => {
            userData.password = hash;
          })
          .catch((Err) => {
            throw new Error();
          });

        await userData.save();
        res.send("user updated");
      } else {
        res.send("user is not found");
      }
    } else {
      res.send("Data is not match");
    }
  }
);

module.exports = router;
