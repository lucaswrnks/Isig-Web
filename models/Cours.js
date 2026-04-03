const { DataTypes } = require('sequelize');
const sequelize  = require('../config/db');
const Enseignant = require('./Enseignant');

const Cours = sequelize.define('Cours', {
  id:            { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nom:           { type: DataTypes.STRING,  allowNull: false },
  id_enseignant: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'cours', timestamps: false });

// Relation enseignant
Cours.belongsTo(Enseignant, { foreignKey: 'id_enseignant', as: 'enseignant' });
Enseignant.hasMany(Cours,   { foreignKey: 'id_enseignant', as: 'cours' });

// NOUVEAU : Relation many-to-many avec Classe via cours_classe
Cours.associate = () => {
  const Classe    = require('./Classe');
  const Formation = require('./Formation');

  Cours.belongsToMany(Classe, {
    through:    'cours_classe',
    foreignKey: 'id_cours',
    otherKey:   'id_classe',
    as:         'classes',
    timestamps: false,
  });

  Classe.belongsToMany(Cours, {
    through:    'cours_classe',
    foreignKey: 'id_classe',
    otherKey:   'id_cours',
    as:         'cours',
    timestamps: false,
  });
};

module.exports = Cours;
