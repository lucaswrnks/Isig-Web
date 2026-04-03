const jwt = require('jsonwebtoken');

// Injecte silencieusement l'utilisateur dans req.user et res.locals.user
// pour que la navbar EJS soit dynamique sur toutes les pages.
module.exports = (req, res, next) => {
  const token = req.cookies?.token;
  if (token) {
    try {
      const decoded    = jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY');
      req.user         = decoded;
      res.locals.user  = decoded;
    } catch {
      req.user = null;
      res.locals.user = null;
    }
  } else {
    req.user = null;
    res.locals.user = null;
  }
  next();
};
