const { role, permission } = require("../models");
const permissionCheck = (permissionData) => {
  return async (req, res, next) => {
    const user = req.user;
    const userPermissions = await role
      .findOne({
        where: { id: user.roleId },
        include: { model: permission },
      })
      .then((role) => {
        return role.permissions.map((permission) => permission.name);
      });

    console.log(permissionData);
    console.log(userPermissions);

    if (!userPermissions.includes(permissionData)) {
      res
        .status(403)
        .send({ error: "You are not allowed to access this resource" });
      return;
    }

    next();
  };
};

module.exports = { permissionCheck };
