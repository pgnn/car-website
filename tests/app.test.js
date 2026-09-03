const request = require('supertest');
const app = require('../server');

describe('Car Shop', () => {
  it('GET / returns 200 and shows a car', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('StuCar Roadster');
    expect(res.text).toContain('More Information');
    expect(res.text).not.toContain('price');
    expect(res.text).toContain('0-60 in 4.2s with revolutionary electric drivetrain');
  });

  it('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('GET /api/cars returns a list of cars', async () => {
    const res = await request(app).get('/api/cars');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
