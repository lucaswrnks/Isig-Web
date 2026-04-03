const router = require('express').Router();
const auth   = require('../../middlewares/auth');
const ALL    = ['admin','administratif','enseignant','etudiant'];
const ADMIN  = ['admin'];

router.get('/',     auth(ALL),   (req, res) => res.render('formations/index', { title: 'Formations' }));
router.get('/new',  auth(ADMIN), (req, res) => res.render('formations/form',  { title: 'Nouvelle formation', item: null }));
router.get('/:id/edit', auth(ADMIN), (req, res) => res.render('formations/form', { title: 'Modifier formation', item: { id: req.params.id } }));

module.exports = router;
