const request = require('supertest');
const app     = require('../app');

async function login(email) {
  const res = await request(app).post('/api/auth/login').send({ email, password: 'password' });
  return res.headers['set-cookie'];
}

let adminCookie, etudiantCookie, idCree;

beforeAll(async () => {
  adminCookie    = await login('admin@isig.fr');
  etudiantCookie = await login('lucas@isig.fr');
});

describe('Sans authentification', () => {
  it('GET /api/cours → 401',        async () => { expect((await request(app).get('/api/cours')).statusCode).toBe(401); });
  it('POST /api/cours → 401',       async () => { expect((await request(app).post('/api/cours').send({})).statusCode).toBe(401); });
  it('PUT /api/cours/1 → 401',      async () => { expect((await request(app).put('/api/cours/1').send({})).statusCode).toBe(401); });
  it('DELETE /api/cours/1 → 401',   async () => { expect((await request(app).delete('/api/cours/1')).statusCode).toBe(401); });
});

describe('Avec admin', () => {
  it('GET /api/cours → 200 + tableau', async () => {
    const res = await request(app).get('/api/cours').set('Cookie', adminCookie);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /api/cours/1 → 200', async () => {
    const res = await request(app).get('/api/cours/1').set('Cookie', adminCookie);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('nom');
  });

  it('GET /api/cours/99999 → 404', async () => {
    const res = await request(app).get('/api/cours/99999').set('Cookie', adminCookie);
    expect(res.statusCode).toBe(404);
  });

  it('POST /api/cours → 201', async () => {
    const res = await request(app).post('/api/cours').set('Cookie', adminCookie)
      .send({ nom: 'Cours SuperTest', id_enseignant: 1 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nom).toBe('Cours SuperTest');
    idCree = res.body.id;
  });

  it('PUT /api/cours/:id → 200', async () => {
    const res = await request(app).put(`/api/cours/${idCree}`).set('Cookie', adminCookie)
      .send({ nom: 'Cours SuperTest Modifie', id_enseignant: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.body.nom).toBe('Cours SuperTest Modifie');
  });

  it('DELETE /api/cours/:id → 200', async () => {
    const res = await request(app).delete(`/api/cours/${idCree}`).set('Cookie', adminCookie);
    expect(res.statusCode).toBe(200);
  });
});

describe('Avec etudiant (acces refuse)', () => {
  it('POST /api/cours → 403', async () => {
    const res = await request(app).post('/api/cours').set('Cookie', etudiantCookie)
      .send({ nom: 'Hack', id_enseignant: 1 });
    expect(res.statusCode).toBe(403);
  });

  it('DELETE /api/cours/1 → 403', async () => {
    const res = await request(app).delete('/api/cours/1').set('Cookie', etudiantCookie);
    expect(res.statusCode).toBe(403);
  });

  it('GET /api/cours → 200 (lecture autorisee)', async () => {
    const res = await request(app).get('/api/cours').set('Cookie', etudiantCookie);
    expect(res.statusCode).toBe(200);
  });
});

describe('Validation', () => {
  it('POST sans nom → 400', async () => {
    const res = await request(app).post('/api/cours').set('Cookie', adminCookie)
      .send({ id_enseignant: 1 });
    expect(res.statusCode).toBe(400);
  });
});