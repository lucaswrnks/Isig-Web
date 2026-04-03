const Classe    = require('../models/Classe');
const Formation = require('../models/Formation');
const Etudiant  = require('../models/Etudiant');

const include = [
  { model: Formation, as: 'formation', attributes: ['id','nom','type'] },
];

// GET /api/classes  (optionnel: ?id_formation=X pour filtrer)
exports.getAll = async (req, res) => {
  try {
    const where = {};
    if (req.query.id_formation) where.id_formation = req.query.id_formation;
    const list = await Classe.findAll({
      where,
      include,
      order: [['id_formation','ASC'],['annee','ASC'],['nom','ASC']],
    });
    res.json(list);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/classes/:id
exports.getOne = async (req, res) => {
  try {
    const c = await Classe.findByPk(req.params.id, { include });
    if (!c) return res.status(404).json({ message: 'Classe introuvable' });
    res.json(c);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/classes/:id/etudiants
exports.getEtudiants = async (req, res) => {
  try {
    const c = await Classe.findByPk(req.params.id);
    if (!c) return res.status(404).json({ message: 'Classe introuvable' });
    const etudiants = await Etudiant.findAll({
      where: { id_classe: req.params.id },
      order: [['nom','ASC']],
    });
    res.json(etudiants);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST /api/classes
exports.create = async (req, res) => {
  try {
    const { nom, annee, id_formation } = req.body;
    if (!nom || !annee || !id_formation)
      return res.status(400).json({ message: 'nom, annee et id_formation sont requis' });
    const c = await Classe.create({ nom, annee, id_formation });
    res.status(201).json(c);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// PUT /api/classes/:id
exports.update = async (req, res) => {
  try {
    const c = await Classe.findByPk(req.params.id);
    if (!c) return res.status(404).json({ message: 'Classe introuvable' });
    await c.update(req.body);
    res.json(c);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// DELETE /api/classes/:id
exports.remove = async (req, res) => {
  try {
    const c = await Classe.findByPk(req.params.id);
    if (!c) return res.status(404).json({ message: 'Classe introuvable' });
    await c.destroy();
    res.json({ message: 'Classe supprimée' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
