const sequelize = require("../config/connection");
const { Item, Order, User, Category } = require("../models");
const itemData = require("../seeds/itemData.json");
const orderData = require("../seeds/orderData.json");
const userData = require("../seeds/userData.json");
const catergoryData = require("../seeds/catergoryData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Item.bulkCreate(itemData);

  await Order.bulkCreate(orderData);

  await User.bulkCreate(userData);

  await Category.bulkCreate(catergoryData);

  process.exit(0);
};

seedDatabase();
