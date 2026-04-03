const request = require('supertest');
const app     = require('../app');

// Recupere le cookie JWT apres login
async function login(email, password = 'password') {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email, password });
  return res.headers['set-cookie'];
}

let adminCookie;
let etudiantCookie;
let idCree; // ID de l'etudiant cree pendant les tests

beforeAll(async () => {
  adminCookie    = await login('admin@isig.fr');
  etudiantCookie = await login('lucas@isig.fr');
});

// ── SANS AUTHENTIFICATION ──────────────────────────────────────────────────
describe('Sans authentification', () => {
  it('GET /api/etudiants → 401', async () => {
    const res = await request(app).get('/api/etudiants');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message');
  });

  it('POST /api/etudiants → 401', async () => {
    const res = await request(app).post('/api/etudiants')
      .send({ nom: 'Test', prenom: 'User', dob: '2000-01-01' });
    expect(res.statusCode).toBe(401);
  });

  it('GET /api/etudiants/1 → 401', async () => {
    const res = await request(app).get('/api/etudiants/1');
    expect(res.statusCode).toBe(401);
  });

  it('PUT /api/etudiants/1 → 401', async () => {
    const res = await request(app).put('/api/etudiants/1')
      .send({ nom: 'X' });
    expect(res.statusCode).toBe(401);
  });

  it('DELETE /api/etudiants/1 → 401', async () => {
    const res = await request(app).delete('/api/etudiants/1');
    expect(res.statusCode).toBe(401);
  });
});

// ── AVEC ADMIN ─────────────────────────────────────────────────────────────
describe('Avec authentification admin', () => {
  it('GET /api/etudiants → 200 + tableau', async () => {
    const res = await request(app)
      .get('/api/etudiants')
      .set('Cookie', adminCookie);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /api/etudiants/1 → 200 + etudiant', async () => {
    const res = await request(app)
      .get('/api/etudiants/1')
      .set('Cookie', adminCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('nom');
    expect(res.body).toHaveProperty('prenom');
  });

  it('GET /api/etudiants/99999 → 404', async () => {
    const res = await request(app)
      .get('/api/etudiants/99999')
      .set('Cookie', adminCookie);
    expect(res.statusCode).toBe(404);
  });

  it('POST /api/etudiants → 201 + etudiant cree', async () => {
    const res = await request(app)
      .post('/api/etudiants')
      .set('Cookie', adminCookie)
      .send({
        nom:    'SuperTest',
        prenom: 'Automate',
        adresse:'1 rue des Tests',
        dob:    '2000-06-15',
        phone:  '0600000001',
        email:  'supertest.auto@isig.fr',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nom).toBe('SuperTest');
    idCree = res.body.id;
  });

  it('PUT /api/etudiants/:id → 200 + nom modifie', async () => {
    const res = await request(app)
      .put(`/api/etudiants/${idCree}`)
      .set('Cookie', adminCookie)
      .send({ nom: 'SuperTestModifie', prenom: 'Automate', dob: '2000-06-15' });

    expect(res.statusCode).toBe(200);
    expect(res.body.nom).toBe('SuperTestModifie');
  });

  it('DELETE /api/etudiants/:id → 200', async () => {
    const res = await request(app)
      .delete(`/api/etudiants/${idCree}`)
      .set('Cookie', adminCookie);
    expect(res.statusCode).toBe(200);
  });
});

// ── AVEC ETUDIANT (acces refuse) ────────────────────────────────────────────
describe('Avec authentification etudiant (acces refuse)', () => {
  it('POST /api/etudiants → 403 Forbidden', async () => {
    const res = await request(app)
      .post('/api/etudiants')
      .set('Cookie', etudiantCookie)
      .send({ nom: 'Hack', prenom: 'Attempt', dob: '2000-01-01' });
    expect(res.statusCode).toBe(403);
  });

  it('DELETE /api/etudiants/1 → 403 Forbidden', async () => {
    const res = await request(app)
      .delete('/api/etudiants/1')
      .set('Cookie', etudiantCookie);
    expect(res.statusCode).toBe(403);
  });

  it('GET /api/etudiants → 200 (etudiant peut lire)', async () => {
    const res = await request(app)
      .get('/api/etudiants')
      .set('Cookie', etudiantCookie);
    expect(res.statusCode).toBe(200);
  });
});

// ── VALIDATION DES DONNEES ──────────────────────────────────────────────────
describe('Validation des donnees', () => {
  it('POST sans champs obligatoires → 400', async () => {
    const res = await request(app)
      .post('/api/etudiants')
      .set('Cookie', adminCookie)
      .send({ nom: 'Incomplet' }); // manque prenom et dob
    expect(res.statusCode).toBe(400);
  });
});