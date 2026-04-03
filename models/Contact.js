const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Contact = sequelize.define('Contact', {
  id:        { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nom:       { type: DataTypes.STRING,  allowNull: false },
  email:     { type: DataTypes.STRING,  allowNull: false },
  telephone: { type: DataTypes.STRING,  allowNull: true, defaultValue: '' },
  photo:     { type: DataTypes.STRING,  allowNull: true, defaultValue: null },
  fichier:   { type: DataTypes.STRING,  allowNull: true, defaultValue: null },
}, { tableName: 'contact', timestamps: false });

module.exports = Contact;
