const Sequelize = require('sequelize');
const sequelize = require('../../../core/db');

const Model = sequelize.define('fieldcategory', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    unique: true,
    notEmpty: true,
    allowNull: false
  }
});

module.exports = Model;
