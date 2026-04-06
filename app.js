const express      = require('express');
const morgan       = require('morgan');
const cors         = require('cors');
const cookieParser = require('cookie-parser');
const path         = require('path');
const sequelize    = require('./config/db');
const setUser      = require('./middlewares/setUser');

// ── Associations (ordre important : pas de circular require) ──────────────────
const Session  = require('./models/Session');
const Cours    = require('./models/Cours');
const Etudiant = require('./models/Etudiant');

Session.associate();   // Session ↔ Etudiant, Cours, Salle, Enseignant, Classe
Cours.associate();     // Cours ↔ Classe (many-to-many via cours_classe)
Etudiant.associate();  // Etudiant ↔ Classe

const app = express();

// ── Middlewares globaux ───────────────────────────────────────────────────────
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(setUser);

// ── Moteur de vues ────────────────────────────────────────────────────────────
app.set('views',       path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ── Fichiers statiques ────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',   express.static(path.join(__dirname, 'uploads')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// ── Routes API ────────────────────────────────────────────────────────────────
app.use('/api/auth',        require('./routes/api/auth'));
app.use('/api/etudiants',   require('./routes/api/etudiants'));
app.use('/api/enseignants', require('./routes/api/enseignants'));
app.use('/api/cours',       require('./routes/api/cours'));
app.use('/api/notes',       require('./routes/api/notes'));
app.use('/api/salles',      require('./routes/api/salles'));
app.use('/api/contacts',    require('./routes/api/contacts'));
app.use('/api/users',       require('./routes/api/users'));
app.use('/api/sessions',    require('./routes/api/sessions'));
app.use('/api/formations',  require('./routes/api/formations'));
app.use('/api/classes',     require('./routes/api/classes'));

// ── Routes Web (EJS) ─────────────────────────────────────────────────────────
app.use('/',             require('./routes/web/index'));
app.use('/etudiants',    require('./routes/web/etudiants'));
app.use('/enseignants',  require('./routes/web/enseignants'));
app.use('/cours',        require('./routes/web/cours'));
app.use('/notes',        require('./routes/web/notes'));
app.use('/salles',       require('./routes/web/salles'));
app.use('/contacts',     require('./routes/web/contacts'));
app.use('/users',        require('./routes/web/users'));
app.use('/sessions',     require('./routes/web/sessions'));
app.use('/formations',   require('./routes/web/formations'));
app.use('/classes',      require('./routes/web/classes'));

// ── Erreur 404 ────────────────────────────────────────────────────────────────
app.use((req, res) => {
  if (req.accepts('json')) return res.status(404).json({ message: 'Route non trouvée' });
  res.status(404).render('404', { title: '404 – Page non trouvée' });
});

// ── Erreur globale ────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Erreur serveur :', err);
  if (req.accepts('json')) return res.status(err.status || 500).json({ message: err.message });
  res.status(err.status || 500).render('error', { error: err, title: 'Erreur serveur' });
});

// ── Démarrage ─────────────────────────────────────────────────────────────────
if (require.main === module) {
  (async () => {
    try {
      await sequelize.authenticate();
      console.log('✅ Connecté à MySQL "university"');
      const PORT = process.env.PORT || 3001;
      app.listen(PORT, () => console.log(`🚀 https://localhost:${PORT}`));
    } catch (err) {
      console.error('❌ Erreur MySQL :', err.message);
      process.exit(1);
    }
  })();
}

module.exports = app;
