"use strict";
const permissions = require("../../app/constants/permissions");
const permissionAssignment = require("../../app/permission-assignment");
const { role, permission } = require("../../app/models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const insertPermission = [];

    for (const key in permissions) {
      insertPermission.push({
        name: permissions[key],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("permissions", insertPermission);

    const permissionRole = [];

    for (const roles in permissionAssignment) {
      for (const permissions of permissionAssignment[roles]) {
        // in = index, of = value
        const roleId = await role
          .findOne({
            where: {
              name: roles,
            },
          })
          .then((role) => role.id);

        const permissionId = await permission
          .findOne({
            where: {
              name: permissions,
            },
          })
          .then((permission) => permission.id);

        permissionRole.push({
          roleId: roleId,
          permissionId: permissionId,
        });
      }
    }

    await queryInterface.bulkInsert("permissionRoles", permissionRole);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissionroles", null, {});
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
