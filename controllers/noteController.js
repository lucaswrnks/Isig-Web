const Note     = require('../models/Note');
const Etudiant = require('../models/Etudiant');
const Cours    = require('../models/Cours');

const include = [
  { model: Etudiant, as: 'etudiant', attributes: ['id','nom','prenom'] },
  { model: Cours,    as: 'cours',    attributes: ['id','nom'] },
];

exports.getAll = async (req, res) => {
  try {
    // Si étudiant : uniquement ses propres notes
    if (req.user.role === 'etudiant') {
      // Chercher la fiche étudiant liée à cet utilisateur (par nom/prenom)
      const etudiant = await Etudiant.findOne({
        where: { nom: req.user.nom, prenom: req.user.prenom }
      });
      if (!etudiant) return res.json([]);
      const notes = await Note.findAll({
        where: { id_etudiant: etudiant.id },
        include,
        order: [['id', 'ASC']],
      });
      return res.json(notes);
    }
    // Autres rôles : toutes les notes
    const notes = await Note.findAll({ include, order: [['id', 'ASC']] });
    res.json(notes);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getOne = async (req, res) => {
  try {
    const n = await Note.findByPk(req.params.id, { include });
    if (!n) return res.status(404).json({ message: 'Note introuvable' });

    // Étudiant ne peut voir que ses propres notes
    if (req.user.role === 'etudiant') {
      const etudiant = await Etudiant.findOne({
        where: { nom: req.user.nom, prenom: req.user.prenom }
      });
      if (!etudiant || n.id_etudiant !== etudiant.id)
        return res.status(403).json({ message: 'Accès refusé' });
    }
    res.json(n);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const { id_etudiant, id_cours, note } = req.body;
    if (!id_etudiant || !id_cours || note === undefined)
      return res.status(400).json({ message: 'id_etudiant, id_cours et note sont requis' });
    const n = await Note.create({ id_etudiant, id_cours, note });
    res.status(201).json(n);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const n = await Note.findByPk(req.params.id);
    if (!n) return res.status(404).json({ message: 'Note introuvable' });
    await n.update(req.body);
    res.json(n);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    const n = await Note.findByPk(req.params.id);
    if (!n) return res.status(404).json({ message: 'Note introuvable' });
    await n.destroy();
    res.json({ message: 'Note supprimée' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
