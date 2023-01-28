const mongoose = require('mongoose');
const request = require('supertest');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const app = require('./app');

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.CONNECTION_STRING);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe('Login', () => {
  it('should successfully login', async () => {
    const res = await request(app).post('/api/user/login').send({
      email: 'imran.cuet.cse17@gmail.com',
      password: '123456',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('successfully logged in');
  });
});
