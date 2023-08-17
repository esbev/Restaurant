const sequelize = require("../config/connection");
const { Item, Order, User, Category } = require("../models");
const itemData = require("../seeds/itemData.json");
const orderData = require("../seeds/orderData.json");
const userData = require("../seeds/userData.json");
const categoryData = require("../seeds/categoryData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Category.bulkCreate(categoryData);

  await Item.bulkCreate(itemData);

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Order.bulkCreate(orderData);

  process.exit(0);
};

seedDatabase();
