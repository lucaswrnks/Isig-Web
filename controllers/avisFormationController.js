const AvisFormation = require('../models/AvisFormation');

// Lire tous les avis
exports.getAll = async (req, res) => {
  try {
    const avis = await AvisFormation.findAll();
    res.json(avis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer un avis
exports.create = async (req, res) => {
  try {
    const { id_etudiant, id_formation, note, commentaire } = req.body;
    console.log('Avis reçu:', req.body);  // pour debug
    const avis = await AvisFormation.create({ 
      id_etudiant, 
      id_formation, 
      note: parseInt(note), 
      commentaire: commentaire || null 
    });
    res.status(201).json(avis);
  } catch (err) {
    console.log('ERREUR:', err.message);
    res.status(500).json({ message: err.message });
  }
};

// Modifier un avis
exports.update = async (req, res) => {
  try {
    const avis = await AvisFormation.findByPk(req.params.id);
    if (!avis) return res.status(404).json({ message: 'Avis non trouvé' });
    await avis.update(req.body);
    res.json(avis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un avis
exports.remove = async (req, res) => {
  try {
    const avis = await AvisFormation.findByPk(req.params.id);
    if (!avis) return res.status(404).json({ message: 'Avis non trouvé' });
    await avis.destroy();
    res.json({ message: 'Avis supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};