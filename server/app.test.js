const mongoose = require('mongoose');
const request = require('supertest');
// eslint-disable-next-line no-unused-vars
const config = require('./config');
const app = require('./app');
const { generateHash, validatePassword } = require('./utils');

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(config.db.local_host);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe('Login', () => {
  it('should successfully login', async () => {
    const res = await request(app).post('/api/user/login').send({
      email: 'u1704107@student.cuet.ac.bd',
      password: '123456',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('successfully logged in');
  });
  it('login should fail', async () => {
    const res = await request(app).post('/api/user/login').send({
      email: 'tahsinnotfound@gamil.com',
      password: '1234567',
    });
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('no such user exists');
  });

  test('hash function check', async () => {
    const password = '1235';
    const hashedPassword = await generateHash(password);

    expect(await validatePassword(password, hashedPassword)).toBe(true);
  });
});
