const Formation = require('../models/Formation');
const Classe    = require('../models/Classe');

// GET /api/formations
exports.getAll = async (req, res) => {
  try {
    const list = await Formation.findAll({
      include: [{ model: Classe, as: 'classes', attributes: ['id','nom','annee'] }],
      order: [['type','ASC'],['nom','ASC']],
    });
    res.json(list);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/formations/:id
exports.getOne = async (req, res) => {
  try {
    const f = await Formation.findByPk(req.params.id, {
      include: [{ model: Classe, as: 'classes' }],
    });
    if (!f) return res.status(404).json({ message: 'Formation introuvable' });
    res.json(f);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST /api/formations
exports.create = async (req, res) => {
  try {
    const { nom, type, description, duree } = req.body;
    if (!nom || !type)
      return res.status(400).json({ message: 'nom et type sont requis' });
    const f = await Formation.create({ nom, type, description, duree });
    res.status(201).json(f);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// PUT /api/formations/:id
exports.update = async (req, res) => {
  try {
    const f = await Formation.findByPk(req.params.id);
    if (!f) return res.status(404).json({ message: 'Formation introuvable' });
    await f.update(req.body);
    res.json(f);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// DELETE /api/formations/:id
exports.remove = async (req, res) => {
  try {
    const f = await Formation.findByPk(req.params.id);
    if (!f) return res.status(404).json({ message: 'Formation introuvable' });
    await f.destroy();
    res.json({ message: 'Formation supprimée' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
