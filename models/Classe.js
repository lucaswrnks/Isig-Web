const { DataTypes } = require('sequelize');
const sequelize  = require('../config/db');
const Formation  = require('./Formation');

const Classe = sequelize.define('Classe', {
  id:           { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nom:          { type: DataTypes.STRING(100), allowNull: false },
  annee:        { type: DataTypes.INTEGER, allowNull: false },
  id_formation: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'classe', timestamps: false });

// Une classe appartient à une formation
Classe.belongsTo(Formation, { foreignKey: 'id_formation', as: 'formation' });
Formation.hasMany(Classe,   { foreignKey: 'id_formation', as: 'classes' });

module.exports = Classe;
