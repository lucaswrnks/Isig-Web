const router = require('express').Router();
const ctrl   = require('../../controllers/sessionController');
const auth   = require('../../middlewares/auth');

const ALL   = ['admin','enseignant','etudiant','administratif'];
const STAFF = ['admin','enseignant'];
const ADMIN = ['admin'];

router.get('/',    auth(ALL),   ctrl.getAll);
router.get('/:id', auth(ALL),   ctrl.getOne);
router.post('/',   auth(STAFF), ctrl.create);
router.put('/:id', auth(STAFF), ctrl.update);
router.delete('/:id', auth(STAFF), ctrl.remove);

// Inscription / désinscription (étudiant sur lui-même)
router.post('/:id/inscrire',      auth(['etudiant','admin']), ctrl.inscrire);
router.delete('/:id/desinscrire', auth(['etudiant','admin']), ctrl.desinscrire);

// Admin gère les inscriptions d'un étudiant spécifique
router.post('/:id/etudiants/:etudiantId',   auth(ADMIN), ctrl.inscrireEtudiant);
router.delete('/:id/etudiants/:etudiantId', auth(ADMIN), ctrl.desinscrireEtudiant);

// NOUVEAU : mettre à jour les classes d'une session


module.exports = router;
