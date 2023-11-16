const { token, user } = require("../models");

const tokenAuth = async (req, res, next) => {
  const authorizationToken = req.headers["authorization"];

  if (!authorizationToken) {
    res.status(401).send({ error: "No token provided!" });
    return;
  }

  const userToken = await token.findOne({
    where: { token: authorizationToken },
  });
  if (!userToken) {
    res.status(401).send({ error: "Invalid token" });
    return;
  }

  const userData = await user.scope("withPassword").findByPk(userToken.userId);
  req.user = userData.toJSON();

  next();
};

module.exports = { tokenAuth };