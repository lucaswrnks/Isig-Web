const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

const SECRET = process.env.JWT_SECRET || 'SECRET_KEY';

// POST /api/register
exports.register = async (req, res) => {
  try {
    const { username, email, password, nom, prenom, role } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: 'Champs obligatoires manquants' });

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email déjà utilisé' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash, nom, prenom, role: role || 'etudiant' });
    return res.status(201).json({ message: 'Compte créé', id: user.id });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// POST /api/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email et mot de passe requis' });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Identifiants invalides' });
    if (user.status === 'banned')   return res.status(403).json({ message: 'Compte banni' });
    if (user.status === 'inactive') return res.status(403).json({ message: 'Compte inactif' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Identifiants invalides' });

    await user.update({ lastLogin: new Date() });

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: user.role, nom: user.nom, prenom: user.prenom },
      SECRET,
      { expiresIn: '8h' }
    );

    res.cookie('token', token, { httpOnly: true, maxAge: 8 * 60 * 60 * 1000 });
    return res.status(200).json({ message: 'Connexion réussie', token, role: user.role });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// POST /api/logout
exports.logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Déconnexion réussie' });
};
