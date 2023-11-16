"use strict";

const user = require("../data/users.json");
const { role } = require("../../app/models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = await role.findAll();
    console.log("roles: ", roles);
    await queryInterface.bulkInsert("users", user);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tokens", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
