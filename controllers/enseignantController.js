const Enseignant = require('../models/Enseignant');

exports.getAll = async (req, res) => {
  try {
    const list = await Enseignant.findAll({ order: [['nom', 'ASC']] });
    res.json(list);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getOne = async (req, res) => {
  try {
    const e = await Enseignant.findByPk(req.params.id);
    if (!e) return res.status(404).json({ message: 'Enseignant introuvable' });
    res.json(e);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const { nom, prenom, adresse, dob, phone } = req.body;
    if (!nom || !prenom || !dob)
      return res.status(400).json({ message: 'nom, prenom et dob sont requis' });
    const e = await Enseignant.create({ nom, prenom, adresse, dob, phone });
    res.status(201).json(e);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const e = await Enseignant.findByPk(req.params.id);
    if (!e) return res.status(404).json({ message: 'Enseignant introuvable' });
    await e.update(req.body);
    res.json(e);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    const e = await Enseignant.findByPk(req.params.id);
    if (!e) return res.status(404).json({ message: 'Enseignant introuvable' });
    await e.destroy();
    res.json({ message: 'Enseignant supprimé' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
