require('dotenv').config();

module.exports = {
    database: process.env.DB_NAME,
    username: process.env.DB_UNAME,
    password: process.env.DB_PASSWORD,
    dialect: 'postgres',
    dialectModulePath: 'pg',
    host: process.env.HOST,
    port: process.env.DB_PORT,
};
