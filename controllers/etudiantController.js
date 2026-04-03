const Etudiant  = require('../models/Etudiant');
const Classe    = require('../models/Classe');
const Formation = require('../models/Formation');

const include = [
  {
    model: Classe, as: 'classe',
    attributes: ['id','nom','annee'],
    include: [{ model: Formation, as: 'formation', attributes: ['id','nom','type'] }],
  },
];

// GET /api/etudiants  (optionnel: ?id_classe=X ou ?id_formation=X)
exports.getAll = async (req, res) => {
  try {
    const where = {};

    // Filtre par classe directe
    if (req.query.id_classe) {
      where.id_classe = req.query.id_classe;
    }

    // Filtre par formation : récupérer toutes les classes de la formation
    if (req.query.id_formation) {
      const classes = await Classe.findAll({ where: { id_formation: req.query.id_formation }, attributes: ['id'] });
      const ids = classes.map(c => c.id);
      where.id_classe = ids.length ? ids : null;
    }

    const etudiants = await Etudiant.findAll({ where, include, order: [['nom','ASC']] });
    res.json(etudiants);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/etudiants/:id
exports.getOne = async (req, res) => {
  try {
    const e = await Etudiant.findByPk(req.params.id, { include });
    if (!e) return res.status(404).json({ message: 'Étudiant introuvable' });
    res.json(e);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST /api/etudiants
exports.create = async (req, res) => {
  try {
    const { nom, prenom, adresse, dob, phone, email, id_classe } = req.body;
    if (!nom || !prenom || !dob)
      return res.status(400).json({ message: 'nom, prenom et dob sont requis' });
    const e = await Etudiant.create({ nom, prenom, adresse, dob, phone, email, id_classe: id_classe || null });
    res.status(201).json(e);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// PUT /api/etudiants/:id
exports.update = async (req, res) => {
  try {
    const e = await Etudiant.findByPk(req.params.id);
    if (!e) return res.status(404).json({ message: 'Étudiant introuvable' });
    await e.update(req.body);
    res.json(e);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// DELETE /api/etudiants/:id
exports.remove = async (req, res) => {
  try {
    const e = await Etudiant.findByPk(req.params.id);
    if (!e) return res.status(404).json({ message: 'Étudiant introuvable' });
    await e.destroy();
    res.json({ message: 'Étudiant supprimé' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
