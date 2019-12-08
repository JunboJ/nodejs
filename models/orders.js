const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const Orders = sequelize.define('orders', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Orders;