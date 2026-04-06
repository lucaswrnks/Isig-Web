const router = require('express').Router();
const auth   = require('../../middlewares/auth');
router.get('/', auth([]), (req,res) => res.render('notes/index', { title: 'Notes' }));
router.get('/new', auth(['admin','administratif']), (req,res) => res.render('notes/form', { title: 'Nouveau', item: null }));
router.get('/:id/edit', auth(['admin','administratif']), (req,res) => res.render('notes/form', { title: 'Modifier', item: { id: req.params.id } }));
module.exports = router;
