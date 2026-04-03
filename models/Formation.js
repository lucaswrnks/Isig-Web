const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Formation = sequelize.define('Formation', {
  id:          { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nom:         { type: DataTypes.STRING(100), allowNull: false },
  type:        { type: DataTypes.ENUM('BTS','Bachelor','Licence','Master'), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  duree:       { type: DataTypes.INTEGER, allowNull: true, defaultValue: 2 },
}, { tableName: 'formation', timestamps: false });

module.exports = Formation;
