import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
// import Goal from '../lib/models/goal.js';

describe('goal routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new goal', async () => {
    const goal1 = {
      description: 'UPDATED',
      achieved: true,
      discovery: '2011-01-01T08:00:00.000Z' 
    };

    const res = await request(app).post('/api/v1/goals').send(goal1);
    expect(res.body).toEqual({
      id: '1',
      ...goal1,
    });

  });

});
