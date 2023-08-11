const User = require('./User');
const Menu = require('./Menu');
const Order = require('./Order')

User.hasMany(Order, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Menu.hasMany(Order, {
  foreignKey: 'menu_id',
  onDelete: 'CASCADE'
});
Order.belongsTo(Menu, {
  foreignKey: 'menu_id'
});

module.exports = { User, Menu, Order };
