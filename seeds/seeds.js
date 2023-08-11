const sequelize = require("./config/connection");
const { Menu, Order, User } = require("./models");
const menuData = require("./seeds/menuData.json");
const orderData = require("./seeds/orderData.json");
const userData = require("./seeds/userData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Menu.bulkCreate(menuData);

  await Order.bulkCreate(orderData);

  await User.bulkCreate(userData);

  process.exit(0);
};

seedDatabase();
