const mongoose = require('mongoose');
const request = require('supertest');
// eslint-disable-next-line no-unused-vars
const config = require('./config');
const app = require('./app');
const token = {"auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q4MGVkYWFiZjk3MTFjNWNjMDgwMDYiLCJpYXQiOjE2NzUxMDcyNTJ9.rcxomjI6omuBwBFCWVdzQVNahd8rUVoQ3_SRWI-qhyQ"};
const invalidToken = {"auth-token": "eyJhbGciO"};

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
});



describe('Profile', () => {
  it('should successfully get profile info', async () => {
    const res = await request(app).get('/api/user/profile').set(token);
    expect(res.statusCode).toBe(200);
  });

  it('should not get profile info', async () => {
    const res = await request(app).get('/api/user/profile');
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("access denied");
  });

  it('should successfully update profile info', async () => {
    const res = await request(app).put('/api/user/profile').set(token).send({
      displayName: "Majumder",
      avatarLink: ""
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("successfully updated user info");
  });
});


describe('Workspace', () => {
  it('should successfully get workspace info', async () => {
    const res = await request(app).get('/api/workspace/WR').set(token);
    expect(res.statusCode).toBe(200);
  });

  it('should not get workspace info', async () => {
    const res = await request(app).get('/api/workspace/WR11').set(token);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("not found");
  });

  it('should not get access', async () => {
    const res = await request(app).get('/api/workspace/WR').set(invalidToken);
    expect(res.statusCode).toBe(498);
    expect(res.body.message).toBe("invalid token");
  });

  // it('should not get workspace info', async () => {
  //   const res = await request(app).get('/api/workspace/WR/project/PR1/board').set(token);
  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.board.columns.length).toBe(3);
  // });
});