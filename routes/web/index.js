const router = require('express').Router();
const auth   = require('../../middlewares/auth');

router.get('/', auth([]), (req, res) => {
  res.render('index', { title: 'Accueil – ISIG - Paris', user: req.user });
});

router.get('/login',    (req, res) => res.render('auth/login',    { title: 'Connexion' }));
router.get('/register', (req, res) => res.render('auth/register', { title: 'Inscription' }));

module.exports = router;
