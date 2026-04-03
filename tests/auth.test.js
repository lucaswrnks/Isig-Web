const request = require('supertest');
const app     = require('../app');

describe('POST /api/auth/register', () => {
  it('retourne 400 si champs manquants', async () => {
    const res = await request(app).post('/api/auth/register').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  it('retourne 400 si email manquant', async () => {
    const res = await request(app).post('/api/auth/register')
      .send({ username: 'test', password: 'test123' });
    expect(res.statusCode).toBe(400);
  });
});

describe('POST /api/auth/login', () => {
  it('retourne 400 si body vide', async () => {
    const res = await request(app).post('/api/auth/login').send({});
    expect(res.statusCode).toBe(400);
  });

  it('retourne 401 avec mauvais identifiants', async () => {
    const res = await request(app).post('/api/auth/login')
      .send({ email: 'faux@gmail.com', password: 'mauvais' });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message');
  });

  it('retourne 400 si password manquant', async () => {
    const res = await request(app).post('/api/auth/login')
      .send({ email: 'admin@gmail.com' });
    expect(res.statusCode).toBe(400);
  });
});

describe('POST /api/auth/logout', () => {
  it('retourne 200 et vide le cookie', async () => {
    const res = await request(app).post('/api/auth/logout');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Déconnexion réussie');
  });
});
