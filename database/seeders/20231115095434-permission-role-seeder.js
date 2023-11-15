"use strict";
const permissionrole = require("../data/permissionroles.json");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("permissionroles", permissionrole);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissionroles", null, {});
  },
};
