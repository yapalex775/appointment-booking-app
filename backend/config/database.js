const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydb', 'myuser', 'mypassword', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;
