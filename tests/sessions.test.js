const request = require('supertest');
const app     = require('../app');

async function login(email) {
  const res = await request(app).post('/api/auth/login').send({ email, password: 'password' });
  return res.headers['set-cookie'];
}

let adminCookie, etudiantCookie, enseignantCookie, idCree;

beforeAll(async () => {
  adminCookie      = await login('admin@isig.fr');
  etudiantCookie   = await login('lucas@isig.fr');
  enseignantCookie = await login('b.jean@isig.fr');
});

describe('Sans authentification', () => {
  it('GET /api/sessions → 401',      async () => { expect((await request(app).get('/api/sessions')).statusCode).toBe(401); });
  it('POST /api/sessions → 401',     async () => { expect((await request(app).post('/api/sessions').send({})).statusCode).toBe(401); });
  it('DELETE /api/sessions/1 → 401', async () => { expect((await request(app).delete('/api/sessions/1')).statusCode).toBe(401); });
});

describe('Avec admin', () => {
  it('GET /api/sessions → 200 + tableau', async () => {
    const res = await request(app).get('/api/sessions').set('Cookie', adminCookie);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /api/sessions/1 → 200 avec etudiants inscrits', async () => {
    const res = await request(app).get('/api/sessions/1').set('Cookie', adminCookie);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('etudiants');
  });

  it('GET /api/sessions/99999 → 404', async () => {
    const res = await request(app).get('/api/sessions/99999').set('Cookie', adminCookie);
    expect(res.statusCode).toBe(404);
  });

  it('POST /api/sessions → 201', async () => {
    const res = await request(app).post('/api/sessions').set('Cookie', adminCookie)
      .send({
        titre:         'Session SuperTest',
        description:   'Test automatise',
        date_debut:    '2026-06-01T09:00:00',
        date_fin:      '2026-06-01T11:00:00',
        id_cours:      1,
        id_salle:      1,
        id_enseignant: 1,
        capacite_max:  20,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    idCree = res.body.id;
  });

  it('PUT /api/sessions/:id → 200', async () => {
    const res = await request(app).put(`/api/sessions/${idCree}`).set('Cookie', adminCookie)
      .send({ titre: 'Session Modifiee', date_debut: '2026-06-01T09:00:00', date_fin: '2026-06-01T11:00:00', id_cours: 1, id_enseignant: 1 });
    expect(res.statusCode).toBe(200);
  });
});

describe('Avec enseignant', () => {
  it('GET /api/sessions → 200 (ses sessions uniquement)', async () => {
    const res = await request(app).get('/api/sessions').set('Cookie', enseignantCookie);
    expect(res.statusCode).toBe(200);
    res.body.forEach(s => expect(s.id_enseignant).toBe(1));
  });
});

describe('Avec etudiant', () => {
  it('GET /api/sessions → 200 (toutes les sessions)', async () => {
    const res = await request(app).get('/api/sessions').set('Cookie', etudiantCookie);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/sessions/:id/inscrire → 200', async () => {
    const res = await request(app)
      .post(`/api/sessions/${idCree}/inscrire`)
      .set('Cookie', etudiantCookie);
    expect(res.statusCode).toBe(200);
  });

  it('Double inscription → 400', async () => {
    const res = await request(app)
      .post(`/api/sessions/${idCree}/inscrire`)
      .set('Cookie', etudiantCookie);
    expect(res.statusCode).toBe(400);
  });

  it('DELETE /api/sessions/:id/desinscrire → 200', async () => {
    const res = await request(app)
      .delete(`/api/sessions/${idCree}/desinscrire`)
      .set('Cookie', etudiantCookie);
    expect(res.statusCode).toBe(200);
  });

  it('POST /api/sessions → 403 (etudiant ne peut pas creer)', async () => {
    const res = await request(app).post('/api/sessions').set('Cookie', etudiantCookie)
      .send({ titre: 'Hack', date_debut: '2026-06-01T09:00:00', date_fin: '2026-06-01T11:00:00', id_cours: 1, id_enseignant: 1 });
    expect(res.statusCode).toBe(403);
  });
});

describe('Validation', () => {
  it('POST sans champs obligatoires → 400', async () => {
    const res = await request(app).post('/api/sessions').set('Cookie', adminCookie)
      .send({ titre: 'Incomplet' });
    expect(res.statusCode).toBe(400);
  });
});

describe('Nettoyage', () => {
  it('DELETE /api/sessions/:id → 200', async () => {
    const res = await request(app).delete(`/api/sessions/${idCree}`).set('Cookie', adminCookie);
    expect(res.statusCode).toBe(200);
  });
});