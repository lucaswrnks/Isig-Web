const router = require('express').Router();
const auth   = require('../../middlewares/auth');

router.get('/', auth([]), (req, res) => {
  res.render('avisFormations/index', { title: 'Avis formations' });
});

module.exports = router;