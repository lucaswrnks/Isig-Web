const router = require('express').Router();
const ctrl   = require('../../controllers/contactController');
const auth   = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');

const fields = upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'fichier', maxCount: 1 }]);

router.get('/',       auth([]),                        ctrl.getAll);
router.get('/:id',    auth([]),                        ctrl.getOne);
router.post('/',      auth(['admin','administratif']), fields, ctrl.create);
router.put('/:id',    auth(['admin','administratif']), fields, ctrl.update);
router.delete('/:id', auth(['admin']),                 ctrl.remove);

module.exports = router;
