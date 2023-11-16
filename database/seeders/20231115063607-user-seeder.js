"use strict";

const userData = require("../data/users.json");
const { user, role } = require("../../app/models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = await role.findAll();
    for (let index = 0; index < userData.length; index++) {
      await user.create(userData[index]);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tokens", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
