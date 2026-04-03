const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Session = sequelize.define('Session', {
  id:            { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  titre:         { type: DataTypes.STRING,  allowNull: false },
  description:   { type: DataTypes.TEXT,    allowNull: true },
  date_debut:    { type: DataTypes.DATE,    allowNull: false },
  date_fin:      { type: DataTypes.DATE,    allowNull: false },
  id_cours:      { type: DataTypes.INTEGER, allowNull: false },
  id_salle:      { type: DataTypes.INTEGER, allowNull: true },
  id_enseignant: { type: DataTypes.INTEGER, allowNull: false },
  capacite_max:  { type: DataTypes.INTEGER, allowNull: true, defaultValue: 30 },
}, { tableName: 'session', timestamps: false });

Session.associate = () => {
  const Cours      = require('./Cours');
  const Salle      = require('./Salle');
  const Enseignant = require('./Enseignant');
  const Etudiant   = require('./Etudiant');

  Session.belongsTo(Cours,      { foreignKey: 'id_cours',      as: 'cours' });
  Session.belongsTo(Salle,      { foreignKey: 'id_salle',      as: 'salle' });
  Session.belongsTo(Enseignant, { foreignKey: 'id_enseignant', as: 'enseignant' });

  Session.belongsToMany(Etudiant, {
    through: { model: 'session_etudiant', timestamps: false },
    foreignKey: 'id_session',
    otherKey:   'id_etudiant',
    as:         'etudiants',
    timestamps: false,
  });
  Etudiant.belongsToMany(Session, {
    through: { model: 'session_etudiant', timestamps: false },
    foreignKey: 'id_etudiant',
    otherKey:   'id_session',
    as:         'sessions',
    timestamps: false,
  });
};

module.exports = Session;