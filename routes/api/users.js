const router = require('express').Router();
const ctrl   = require('../../controllers/userController');
const auth   = require('../../middlewares/auth');

router.get('/',       auth(['admin']), ctrl.getAll);
router.get('/:id',    auth(['admin']), ctrl.getOne);
router.post('/',      auth(['admin']), ctrl.create);
router.put('/:id',    auth(['admin']), ctrl.update);
router.delete('/:id', auth(['admin']), ctrl.remove);

module.exports = router;
