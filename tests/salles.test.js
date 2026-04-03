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
  it('GET /api/salles → 401',       async () => { expect((await request(app).get('/api/salles')).statusCode).toBe(401); });
  it('POST /api/salles → 401',      async () => { expect((await request(app).post('/api/salles').send({})).statusCode).toBe(401); });
  it('PUT /api/salles/1 → 401',     async () => { expect((await request(app).put('/api/salles/1').send({})).statusCode).toBe(401); });
  it('DELETE /api/salles/1 → 401',  async () => { expect((await request(app).delete('/api/salles/1')).statusCode).toBe(401); });
});

describe('Avec admin', () => {
  it('GET /api/salles → 200 + tableau', async () => {
    const res = await request(app).get('/api/salles').set('Cookie', adminCookie);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /api/salles/1 → 200', async () => {
    const res = await request(app).get('/api/salles/1').set('Cookie', adminCookie);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('numero');
  });

  it('GET /api/salles/99999 → 404', async () => {
    const res = await request(app).get('/api/salles/99999').set('Cookie', adminCookie);
    expect(res.statusCode).toBe(404);
  });

  it('POST /api/salles → 201', async () => {
    const res = await request(app).post('/api/salles').set('Cookie', adminCookie)
      .send({ numero: 'Z999', description: 'Salle de test SuperTest', nombre_chaises: 25 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.numero).toBe('Z999');
    idCree = res.body.id;
  });

  it('PUT /api/salles/:id → 200', async () => {
    const res = await request(app).put(`/api/salles/${idCree}`).set('Cookie', adminCookie)
      .send({ numero: 'Z999', description: 'Salle modifiee', nombre_chaises: 30 });
    expect(res.statusCode).toBe(200);
    expect(res.body.nombre_chaises).toBe(30);
  });

  it('DELETE /api/salles/:id → 200', async () => {
    const res = await request(app).delete(`/api/salles/${idCree}`).set('Cookie', adminCookie);
    expect(res.statusCode).toBe(200);
  });
});

describe('Avec etudiant (acces refuse)', () => {
  it('POST /api/salles → 403', async () => {
    const res = await request(app).post('/api/salles').set('Cookie', etudiantCookie)
      .send({ numero: 'HACK', nombre_chaises: 10 });
    expect(res.statusCode).toBe(403);
  });

  it('DELETE /api/salles/1 → 403', async () => {
    const res = await request(app).delete('/api/salles/1').set('Cookie', etudiantCookie);
    expect(res.statusCode).toBe(403);
  });

  it('GET /api/salles → 200 (lecture autorisee)', async () => {
    const res = await request(app).get('/api/salles').set('Cookie', etudiantCookie);
    expect(res.statusCode).toBe(200);
  });
});

describe('Validation', () => {
  it('POST sans numero → 400', async () => {
    const res = await request(app).post('/api/salles').set('Cookie', adminCookie)
      .send({ description: 'Sans numero' });
    expect(res.statusCode).toBe(400);
  });
});