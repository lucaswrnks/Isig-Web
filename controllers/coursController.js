const Cours      = require('../models/Cours');
const Enseignant = require('../models/Enseignant');
const Classe     = require('../models/Classe');
const Formation  = require('../models/Formation');

// Include complet : enseignant + classes + formation de chaque classe
const include = [
  { model: Enseignant, as: 'enseignant', attributes: ['id','nom','prenom'] },
  {
    model: Classe, as: 'classes',
    attributes: ['id','nom','annee','id_formation'],
    through: { attributes: [] },   // masquer la table pivot
    include: [{ model: Formation, as: 'formation', attributes: ['id','nom','type'] }],
  },
];

// GET /api/cours  (optionnel ?id_formation=X pour filtrer)
exports.getAll = async (req, res) => {
  try {
    const list = await Cours.findAll({ include, order: [['nom','ASC']] });

    // Filtre par formation si demandé (côté JS car join many-to-many)
    if (req.query.id_formation) {
      const idF = parseInt(req.query.id_formation);
      const filtered = list.filter(c =>
        c.classes && c.classes.some(cl => cl.id_formation === idF)
      );
      return res.json(filtered);
    }

    res.json(list);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/cours/:id
exports.getOne = async (req, res) => {
  try {
    const c = await Cours.findByPk(req.params.id, { include });
    if (!c) return res.status(404).json({ message: 'Cours introuvable' });
    res.json(c);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST /api/cours
exports.create = async (req, res) => {
  try {
    const { nom, id_enseignant, classes } = req.body;
    if (!nom || !id_enseignant)
      return res.status(400).json({ message: 'nom et id_enseignant sont requis' });

    const c = await Cours.create({ nom, id_enseignant });

    // Lier les classes si fournies
    if (classes && Array.isArray(classes) && classes.length > 0) {
      await c.setClasses(classes.map(id => parseInt(id)));
    }

    // Recharger avec les associations
    const full = await Cours.findByPk(c.id, { include });
    res.status(201).json(full);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// PUT /api/cours/:id
exports.update = async (req, res) => {
  try {
    const c = await Cours.findByPk(req.params.id);
    if (!c) return res.status(404).json({ message: 'Cours introuvable' });

    const { nom, id_enseignant, classes } = req.body;
    await c.update({ nom, id_enseignant });

    // Mettre à jour les classes liées
    if (classes !== undefined) {
      const ids = Array.isArray(classes)
        ? classes.map(id => parseInt(id))
        : [];
      await c.setClasses(ids);
    }

    const full = await Cours.findByPk(c.id, { include });
    res.json(full);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// DELETE /api/cours/:id
exports.remove = async (req, res) => {
  try {
    const c = await Cours.findByPk(req.params.id);
    if (!c) return res.status(404).json({ message: 'Cours introuvable' });
    await c.setClasses([]);  // supprimer les liaisons d'abord
    await c.destroy();
    res.json({ message: 'Cours supprimé' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST /api/cours/:id/classes  — endpoint dédié pour mettre à jour les classes d'un cours
exports.updateClasses = async (req, res) => {
  try {
    const c = await Cours.findByPk(req.params.id);
    if (!c) return res.status(404).json({ message: 'Cours introuvable' });

    const ids = Array.isArray(req.body.classes)
      ? req.body.classes.map(id => parseInt(id))
      : [];

    await c.setClasses(ids);
    const full = await Cours.findByPk(c.id, { include });
    res.json({ message: 'Classes mises à jour', cours: full });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
