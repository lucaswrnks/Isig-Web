const Session    = require('../models/Session');
const Cours      = require('../models/Cours');
const Salle      = require('../models/Salle');
const Enseignant = require('../models/Enseignant');
const Etudiant   = require('../models/Etudiant');

const include = [
  { model: Cours,      as: 'cours',      attributes: ['id','nom'] },
  { model: Salle,      as: 'salle',      attributes: ['id','numero','nombre_chaises'] },
  { model: Enseignant, as: 'enseignant', attributes: ['id','nom','prenom'] },
  { model: Etudiant,   as: 'etudiants',  attributes: ['id','nom','prenom'], through: { attributes: [] } },
];

async function getEtudiantFromUser(user) {
  if (user.email) {
    const e = await Etudiant.findOne({ where: { email: user.email } });
    if (e) return { etudiant: e, debug: 'trouvé par email' };
  }
  if (user.nom && user.prenom) {
    const e = await Etudiant.findOne({ where: { nom: user.nom, prenom: user.prenom } });
    if (e) return { etudiant: e, debug: 'trouvé par nom/prenom' };
  }
  if (user.username) {
    const e = await Etudiant.findOne({ where: { nom: user.username } });
    if (e) return { etudiant: e, debug: 'trouvé par username' };
  }
  return { etudiant: null, debug: `aucune fiche pour email="${user.email}" nom="${user.nom}" prenom="${user.prenom}"` };
}

async function getEnseignantFromUser(user) {
  if (user.email) {
    const e = await Enseignant.findOne({ where: { email: user.email } });
    if (e) return e;
  }
  if (user.nom && user.prenom) {
    const e = await Enseignant.findOne({ where: { nom: user.nom, prenom: user.prenom } });
    if (e) return e;
  }
  return null;
}

// GET /api/sessions
exports.getAll = async (req, res) => {
  try {
    let where = {};
    if (req.user.role === 'enseignant') {
      const ens = await getEnseignantFromUser(req.user);
      if (ens) where.id_enseignant = ens.id;
    }
    const sessions = await Session.findAll({ where, include, order: [['date_debut','ASC']] });
    res.json(sessions);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/sessions/:id
exports.getOne = async (req, res) => {
  try {
    const s = await Session.findByPk(req.params.id, { include });
    if (!s) return res.status(404).json({ message: 'Session introuvable' });
    res.json(s);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST /api/sessions
exports.create = async (req, res) => {
  try {
    const { titre, description, date_debut, date_fin, id_cours, id_salle,
            id_enseignant, capacite_max } = req.body;
    if (!titre || !date_debut || !date_fin || !id_cours || !id_enseignant)
      return res.status(400).json({ message: 'Champs obligatoires manquants' });

    const s = await Session.create({
      titre, description,
      date_debut, date_fin,
      id_cours,
      id_salle: id_salle || null,
      id_enseignant,
      capacite_max: capacite_max || 30,
    });

    const full = await Session.findByPk(s.id, { include });
    res.status(201).json({ ...full.toJSON(), message: 'Session créée' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// PUT /api/sessions/:id
exports.update = async (req, res) => {
  try {
    const s = await Session.findByPk(req.params.id);
    if (!s) return res.status(404).json({ message: 'Session introuvable' });

    if (req.user.role === 'enseignant') {
      const ens = await getEnseignantFromUser(req.user);
      if (!ens || s.id_enseignant !== ens.id)
        return res.status(403).json({ message: 'Accès refusé' });
    }

    await s.update(req.body);
    const full = await Session.findByPk(s.id, { include });
    res.json({ ...full.toJSON(), message: 'Session mise à jour' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// DELETE /api/sessions/:id
exports.remove = async (req, res) => {
  try {
    const s = await Session.findByPk(req.params.id);
    if (!s) return res.status(404).json({ message: 'Session introuvable' });

    if (req.user.role === 'enseignant') {
      const ens = await getEnseignantFromUser(req.user);
      if (!ens || s.id_enseignant !== ens.id)
        return res.status(403).json({ message: 'Accès refusé' });
    }

    await s.destroy();
    res.json({ message: 'Session supprimée' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST /api/sessions/:id/inscrire
exports.inscrire = async (req, res) => {
  try {
    const s = await Session.findByPk(req.params.id, { include });
    if (!s) return res.status(404).json({ message: 'Session introuvable' });

    const { etudiant, debug } = await getEtudiantFromUser(req.user);
    if (!etudiant)
      return res.status(404).json({ message: `Aucune fiche étudiant liée à votre compte (${debug}).` });

    if (s.capacite_max && s.etudiants.length >= s.capacite_max)
      return res.status(400).json({ message: 'Session complète' });

    if (s.etudiants.find(e => e.id === etudiant.id))
      return res.status(400).json({ message: 'Vous êtes déjà inscrit à cette session' });

    await s.addEtudiant(etudiant);
    res.json({ message: 'Inscription réussie !' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// DELETE /api/sessions/:id/desinscrire
exports.desinscrire = async (req, res) => {
  try {
    const s = await Session.findByPk(req.params.id, { include });
    if (!s) return res.status(404).json({ message: 'Session introuvable' });

    const { etudiant } = await getEtudiantFromUser(req.user);
    if (!etudiant) return res.status(404).json({ message: 'Fiche étudiant introuvable' });

    await s.removeEtudiant(etudiant);
    res.json({ message: 'Désinscription réussie' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST /api/sessions/:id/etudiants/:etudiantId
exports.inscrireEtudiant = async (req, res) => {
  try {
    const s = await Session.findByPk(req.params.id, { include });
    if (!s) return res.status(404).json({ message: 'Session introuvable' });
    const etudiant = await Etudiant.findByPk(req.params.etudiantId);
    if (!etudiant) return res.status(404).json({ message: 'Étudiant introuvable' });
    if (s.etudiants.find(e => e.id === etudiant.id))
      return res.status(400).json({ message: 'Déjà inscrit' });
    await s.addEtudiant(etudiant);
    res.json({ message: etudiant.nom + ' ' + etudiant.prenom + ' inscrit avec succès' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// DELETE /api/sessions/:id/etudiants/:etudiantId
exports.desinscrireEtudiant = async (req, res) => {
  try {
    const s = await Session.findByPk(req.params.id, { include });
    if (!s) return res.status(404).json({ message: 'Session introuvable' });
    const etudiant = await Etudiant.findByPk(req.params.etudiantId);
    if (!etudiant) return res.status(404).json({ message: 'Étudiant introuvable' });
    await s.removeEtudiant(etudiant);
    res.json({ message: etudiant.nom + ' ' + etudiant.prenom + ' désinscrit' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};