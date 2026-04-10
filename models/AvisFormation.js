const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const AvisFormation = sequelize.define('AvisFormation', {
  id:           { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_etudiant:  { type: DataTypes.INTEGER, allowNull: false },
  id_formation: { type: DataTypes.INTEGER, allowNull: false },
  note:         { type: DataTypes.INTEGER, allowNull: false },
  commentaire:  { type: DataTypes.TEXT },
}, { tableName: 'avis_formation', timestamps: false });

module.exports = AvisFormation;