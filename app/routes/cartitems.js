const express = require("express");
const { cartitem, token } = require("../models");
const router = express.Router();
const allowedTo = require("../constants/permissions");
const { tokenAuth } = require("../middlewares/tokenAuth");
const { permissionCheck } = require("../middlewares/permissionAuth");

router.use(tokenAuth);

router.get("/getAll", 
permissionCheck(allowedTo.BROWSE_CARTITEMS),
async (req, res) => {
  const cartData = await cartitem.findAll();
  res.json(cartData)
});

router.get("/", 
permissionCheck(allowedTo.READ_CARTITEM),
async (req, res) => {
  const tokenData = await token.findOne({
    where: { token: req.headers["authorization"]},
    include: "user",
  }); // ambil id user dari token
  
  cartitem.findAll({ where: {userId: tokenData.user.id }}).then((cartitem) => {
    res.json(cartitem);
  });
});

router.delete(
  "/:id",
  permissionCheck(allowedTo.DELETE_CARTITEM),
  async (req, res) => { 
    const cartData = await cartitem.findOne ({
      where: { id: req.params.id }, 
      include: "user",
    }); // ambil id user dari parameter id dari cart item
    
    cartData==null?res.send("no cart item"):0;

    const tokenData = await token.findOne({
      where: { token: req.headers["authorization"]},
      include: "user",
    }); // ambil user id dari token 
    
    if (cartData.user.id == tokenData.user.id){

    // di check apakah sama idnya? jika sama maka delete success
    // jika idnya beda maka delete failed
      await cartitem
        .destroy({
          where: {
            id: req.params.id,
          },
        }) 
        res.send("Delete Success");
    } else {
      res.send("id tidak sama");
    } 
  }
);

module.exports = router;
