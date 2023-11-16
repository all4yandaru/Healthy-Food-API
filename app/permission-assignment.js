const permissions = require("./constants/permissions");
const roles = require("./constants/roles");

module.exports = {
  [roles.ADMIN]: [
    // user
    permissions.BROWSE_USERS,
    permissions.EDIT_USER,
    permissions.ADD_USER,
    // product
    permissions.BROWSE_PRODUCTS,
    permissions.READ_PRODUCT,
    permissions.ADD_PRODUCT,
    permissions.EDIT_PRODUCT,
    permissions.DELETE_PRODUCT,
    // category
    permissions.BROWSE_CATEGORIES,
    permissions.READ_CATEGORY,
    permissions.ADD_CATEGORY,
    permissions.EDIT_CATEGORY,
    permissions.DELETE_CATEGORY,
    // Cart Item
    permissions.BROWSE_CARTITEMS,
    // order
    permissions.BROWSE_ORDERS,
    // order item
    permissions.BROWSE_ORDERITEMS,
  ],
  [roles.CUSTOMER]: [
    // User
    permissions.ADD_USER,
    permissions.READ_USER,
    permissions.EDIT_USER,
    // Product
    permissions.BROWSE_PRODUCTS,
    permissions.READ_PRODUCT,
    // Category
    permissions.BROWSE_CATEGORIES,
    permissions.READ_CATEGORY,
    // Order
    permissions.ADD_ORDER,
    permissions.READ_ORDER,
    permissions.EDIT_ORDER,
    // Order Item
    permissions.READ_ORDERITEM,
    permissions.ADD_ORDERITEM,
    permissions.EDIT_ORDERITEM,
  ],
};
