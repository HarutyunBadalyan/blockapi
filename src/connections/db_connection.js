const Sequelize = require('sequelize');
const config = require("../db/config/db_config")

const sequelize = new Sequelize(config);

module.exports = sequelize