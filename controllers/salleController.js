const Salle = require('../models/Salle');

exports.getAll = async (req, res) => {
  try {
    const salles = await Salle.findAll({ order: [['numero', 'ASC']] });
    res.json(salles);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getOne = async (req, res) => {
  try {
    const s = await Salle.findByPk(req.params.id);
    if (!s) return res.status(404).json({ message: 'Salle introuvable' });
    res.json(s);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const { numero, description, nombre_chaises } = req.body;
    if (!numero) return res.status(400).json({ message: 'Le numéro de salle est requis' });
    const s = await Salle.create({ numero, description, nombre_chaises });
    res.status(201).json(s);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const s = await Salle.findByPk(req.params.id);
    if (!s) return res.status(404).json({ message: 'Salle introuvable' });
    await s.update(req.body);
    res.json(s);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    const s = await Salle.findByPk(req.params.id);
    if (!s) return res.status(404).json({ message: 'Salle introuvable' });
    await s.destroy();
    res.json({ message: 'Salle supprimée' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
