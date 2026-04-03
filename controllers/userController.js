const bcrypt     = require('bcrypt');
const User       = require('../models/User');
const Etudiant   = require('../models/Etudiant');
const Enseignant = require('../models/Enseignant');

const SAFE = { attributes: { exclude: ['password','resetPasswordToken','resetPasswordExpires'] } };

exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll({ ...SAFE, order: [['createdAt', 'DESC']] });
    res.json(users);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getOne = async (req, res) => {
  try {
    const u = await User.findByPk(req.params.id, SAFE);
    if (!u) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.json(u);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const { username, email, password, role, nom, prenom, phone, adresse, status, dob } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: 'username, email et password sont requis' });

    const hash = await bcrypt.hash(password, 10);
    const u = await User.create({ username, email, password: hash, role, nom, prenom, phone, adresse, status });

    // Création automatique de la fiche selon le rôle
    if (role === 'etudiant' && nom && prenom) {
      const dobFinal = dob || '2000-01-01';
      await Etudiant.create({ nom, prenom, adresse: adresse || '', dob: dobFinal, phone: phone || '', email });
    }
    if (role === 'enseignant' && nom && prenom) {
      const dobFinal = dob || '1980-01-01';
      await Enseignant.create({ nom, prenom, adresse: adresse || '', dob: dobFinal, phone: phone || '', email });
    }

    const { password: _, ...safe } = u.toJSON();
    res.status(201).json({ ...safe, message: role === 'etudiant' ? 'Compte et fiche étudiant créés' : role === 'enseignant' ? 'Compte et fiche enseignant créés' : 'Compte créé' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const u = await User.findByPk(req.params.id);
    if (!u) return res.status(404).json({ message: 'Utilisateur introuvable' });
    const data = { ...req.body };
    if (data.password) data.password = await bcrypt.hash(data.password, 10);
    await u.update(data);
    const { password: _, ...safe } = u.toJSON();
    res.json(safe);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    const u = await User.findByPk(req.params.id);
    if (!u) return res.status(404).json({ message: 'Utilisateur introuvable' });
    await u.destroy();
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
