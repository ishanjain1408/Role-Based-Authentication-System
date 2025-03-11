const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('myproject', 'root', 'Ishan2001#', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;