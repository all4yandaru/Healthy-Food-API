const permissions = require("./constants/permissions");
const roles = require("./constants/roles");

module.exports = {
  [roles.ADMINISTRATOR]: [
    // permissions.BROWSE_BOOKS,
    // permissions.READ_BOOK,
    // permissions.ADD_BOOK,
    // permissions.EDIT_BOOK,
    // permissions.DELETE_BOOK,
  ],
  [roles.CUSTOMER]: [
    // permissions.BROWSE_BOOKS,
    // permissions.READ_BOOK
  ],
};
