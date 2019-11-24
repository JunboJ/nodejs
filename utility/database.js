const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodestudy', 'root', 'Kane22271672!', {
    port: '3307', 
    dialect: 'mysql'
});

module.exports = sequelize;