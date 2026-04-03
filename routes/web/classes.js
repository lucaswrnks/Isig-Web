const router = require('express').Router();
const auth   = require('../../middlewares/auth');
const ALL    = ['admin','administratif','enseignant','etudiant'];
const ADMIN  = ['admin'];

router.get('/',     auth(ALL),   (req, res) => res.render('classes/index', { title: 'Classes' }));
router.get('/new',  auth(ADMIN), (req, res) => res.render('classes/form',  { title: 'Nouvelle classe', item: null }));
router.get('/:id/edit', auth(ADMIN), (req, res) => res.render('classes/form', { title: 'Modifier classe', item: { id: req.params.id } }));

module.exports = router;
