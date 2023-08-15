const User = require('./User');
const Category = require('./Category');
const Order = require('./Order')
const Item = require('./Item')

User.hasMany(Order, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
Order.belongsTo(User,{
  foreignKey: 'user_id'
})

Category.hasMany(Item, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});
Item.belongsTo(Category,{
  foreignKey:'category_id',
})

module.exports = { User, Category, Order, Item };
