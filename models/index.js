const User = require('./User');
const Menu = require('./Menu');
const Order = require('./Order')

User.hasMany(Order, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});


module.exports = { User, Menu, Order };
