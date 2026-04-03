const router = require('express').Router();
const ctrl   = require('../../controllers/etudiantController');
const auth   = require('../../middlewares/auth');

router.get('/',       auth(['admin','administratif','enseignant','etudiant']), ctrl.getAll);
router.get('/:id',    auth(['admin','administratif','enseignant','etudiant']), ctrl.getOne);
router.post('/',      auth(['admin']), ctrl.create);
router.put('/:id',    auth(['admin']), ctrl.update);
router.delete('/:id', auth(['admin']), ctrl.remove);

module.exports = router;
