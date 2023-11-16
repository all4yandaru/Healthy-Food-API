"use strict";
const orderitem = require("../data/orderitems.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("orderitems", orderitem);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("orderitems", null, {});
  },
};
