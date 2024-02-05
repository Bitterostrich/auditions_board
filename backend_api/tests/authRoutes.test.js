const request = require('supertest');
const app = require('../index.js');



describe('GET /', () => {
    it('responds with BEANS AND FISH AND EGGS AND CHIPS AND BACON AND SAUSAGE', async () => {
        const response = await request(app).get('/');
        expect(response.text).toContain('BEANS AND FISH AND EGGS AND CHIPS AND BACON AND SAUSAGE')
    })
})

describe('POST /login', () => {
    it('responds with json containing a token', async () => {
        const response = await request(app)
        .post('/login')
        .send({ username: 'bobmanman', password: '1234'});

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    });
});

describe('POST /register', () => {
    it('responds with json containing a token', async () => {
        const response = await request(app)
        .post('/register')
        .send({ username: 'Stannis', password: '1234'})
    
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token')
    })
})

describe('Sample Test', () => {
    it('should pass', () => {
      expect(true).toBe(true);
    });
  });