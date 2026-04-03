const router = require('express').Router();
const auth   = require('../../middlewares/auth');

router.get('/', auth(['admin','enseignant','etudiant','administratif']), (req, res) => {
  res.render('sessions/index', { title: 'Sessions', user: req.user });
});
router.get('/new', auth(['admin','enseignant']), (req, res) => {
  res.render('sessions/form', { title: 'Nouvelle session', item: null, user: req.user });
});
router.get('/:id/edit', auth(['admin','enseignant']), (req, res) => {
  res.render('sessions/form', { title: 'Modifier session', item: { id: req.params.id }, user: req.user });
});
module.exports = router;
