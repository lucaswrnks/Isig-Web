const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Salle = sequelize.define('Salle', {
  id:             { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  numero:         { type: DataTypes.STRING,  allowNull: false, unique: true },
  description:    { type: DataTypes.STRING,  allowNull: true },
  nombre_chaises: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
}, { tableName: 'salle', timestamps: false });

module.exports = Salle;
