const router = require('express').Router();
const ctrl   = require('../../controllers/coursController');
const auth   = require('../../middlewares/auth');

const ALL   = ['admin','administratif','enseignant','etudiant'];
const ADMIN = ['admin'];

router.get('/',       auth(ALL),   ctrl.getAll);
router.get('/:id',    auth(ALL),   ctrl.getOne);
router.post('/',      auth(ADMIN), ctrl.create);
router.put('/:id',    auth(ADMIN), ctrl.update);
router.delete('/:id', auth(ADMIN), ctrl.remove);

// NOUVEAU : mettre à jour les classes d'un cours
router.post('/:id/classes', auth(ADMIN), ctrl.updateClasses);

module.exports = router;
