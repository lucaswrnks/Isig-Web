const router = require('express').Router();
const ctrl   = require('../../controllers/noteController');
const auth   = require('../../middlewares/auth');

router.get('/',       auth([]),                                      ctrl.getAll);
router.get('/:id',    auth([]),                                      ctrl.getOne);
router.post('/',      auth(['admin','administratif','enseignant']),  ctrl.create);
router.put('/:id',    auth(['admin','administratif','enseignant']),  ctrl.update);
router.delete('/:id', auth(['admin']),                               ctrl.remove);

module.exports = router;
