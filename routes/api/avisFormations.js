const router = require('express').Router();
const ctrl   = require('../../controllers/avisFormationController');
const auth   = require('../../middlewares/auth');

router.get('/',       auth([]),           ctrl.getAll);
router.post('/',      auth(['etudiant']), ctrl.create);
router.put('/:id',    auth(['etudiant']), ctrl.update);
router.delete('/:id', auth(['admin']),    ctrl.remove);

module.exports = router;