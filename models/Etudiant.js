const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Etudiant = sequelize.define('Etudiant', {
  id:       { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nom:      { type: DataTypes.STRING, allowNull: false },
  prenom:   { type: DataTypes.STRING, allowNull: false },
  adresse:  { type: DataTypes.STRING, allowNull: true },
  dob:      { type: DataTypes.DATE,   allowNull: false },
  phone:    { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
  email:    { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  // NOUVEAU : lien vers la classe
  id_classe: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
}, { tableName: 'etudiant', timestamps: false });

// Association définie après pour éviter les imports circulaires
Etudiant.associate = () => {
  const Classe = require('./Classe');
  Etudiant.belongsTo(Classe, { foreignKey: 'id_classe', as: 'classe' });
  Classe.hasMany(Etudiant,   { foreignKey: 'id_classe', as: 'etudiants' });
};

module.exports = Etudiant;
