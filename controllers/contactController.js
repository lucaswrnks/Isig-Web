const Contact = require('../models/Contact');
const fs      = require('fs');
const path    = require('path');

exports.getAll = async (req, res) => {
  try {
    const contacts = await Contact.findAll({ order: [['nom', 'ASC']] });
    res.json(contacts);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getOne = async (req, res) => {
  try {
    const c = await Contact.findByPk(req.params.id);
    if (!c) return res.status(404).json({ message: 'Contact introuvable' });
    res.json(c);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const { nom, email, telephone } = req.body;
    if (!nom || !email) return res.status(400).json({ message: 'nom et email sont requis' });
    const photo   = req.files?.photo?.[0]?.filename   || null;
    const fichier = req.files?.fichier?.[0]?.filename || null;
    const c = await Contact.create({ nom, email, telephone, photo, fichier });
    res.status(201).json(c);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const c = await Contact.findByPk(req.params.id);
    if (!c) return res.status(404).json({ message: 'Contact introuvable' });
    const data = { ...req.body };
    if (req.files?.photo?.[0])   data.photo   = req.files.photo[0].filename;
    if (req.files?.fichier?.[0]) data.fichier = req.files.fichier[0].filename;
    await c.update(data);
    res.json(c);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    const c = await Contact.findByPk(req.params.id);
    if (!c) return res.status(404).json({ message: 'Contact introuvable' });
    // Supprime les fichiers associés
    const del = (f) => { if (f) { const p = path.join(__dirname,'../uploads',f); if (fs.existsSync(p)) fs.unlinkSync(p); } };
    del(c.photo); del(c.fichier);
    await c.destroy();
    res.json({ message: 'Contact supprimé' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
