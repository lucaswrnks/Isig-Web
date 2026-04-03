const jwt = require('jsonwebtoken');

/**
 * Middleware d'authentification JWT + contrôle de rôle.
 * @param {string[]} roles  Rôles autorisés. Vide = tout utilisateur connecté.
 */
const auth = (roles = []) => (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    if (!req.originalUrl.startsWith('/api')) return res.redirect('/login');
    return res.status(401).json({ message: 'Authentification requise' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY');
    req.user        = decoded;
    res.locals.user = decoded;

    if (roles.length && !roles.includes(decoded.role)) {
      if (!req.originalUrl.startsWith('/api')) return res.status(403).render('403', { title: 'Accès refusé', user: decoded });
      return res.status(403).json({ message: 'Accès refusé' });
    }
    next();
  } catch (err) {
    if (!req.originalUrl.startsWith('/api')) return res.redirect('/login');
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};

module.exports = auth;
