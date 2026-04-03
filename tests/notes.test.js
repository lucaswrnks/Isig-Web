const request = require('supertest');
const app     = require('../app');

async function login(email) {
  const res = await request(app).post('/api/auth/login').send({ email, password: 'password' });
  return res.headers['set-cookie'];
}

let adminCookie, etudiantCookie;

beforeAll(async () => {
  adminCookie    = await login('admin@isig.fr');
  etudiantCookie = await login('lucas@isig.fr');
});

describe('Sans authentification', () => {
  it('GET /api/notes → 401',      async () => { expect((await request(app).get('/api/notes')).statusCode).toBe(401); });
  it('POST /api/notes → 401',     async () => { expect((await request(app).post('/api/notes').send({})).statusCode).toBe(401); });
  it('DELETE /api/notes/1 → 401', async () => { expect((await request(app).delete('/api/notes/1')).statusCode).toBe(401); });
});

describe('Avec admin', () => {
  it('GET /api/notes → 200 + tableau', async () => {
    const res = await request(app).get('/api/notes').set('Cookie', adminCookie);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/notes → 201', async () => {
    const res = await request(app).post('/api/notes').set('Cookie', adminCookie)
      .send({ id_etudiant: 1, id_cours: 1, note: 15 });
    expect([200, 201]).toContain(res.statusCode);
  });
});

describe('Avec etudiant', () => {
  it('GET /api/notes → 200 (voit ses propres notes)', async () => {
    const res = await request(app).get('/api/notes').set('Cookie', etudiantCookie);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/notes → 403 (etudiant ne peut pas saisir)', async () => {
    const res = await request(app).post('/api/notes').set('Cookie', etudiantCookie)
      .send({ id_etudiant: 1, id_cours: 1, note: 20 });
    expect(res.statusCode).toBe(403);
  });
});