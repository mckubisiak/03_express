import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new goal', () => {
    return request(app)
      .post('api/v1/goals')
      .send({ goal: 'UPDATED' })
      .then((res) => {
        expect(res.body).toEqual({ goal: 'UPDATED' });
      });
  });

});
