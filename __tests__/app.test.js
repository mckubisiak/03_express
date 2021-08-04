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
      description: 'choose a table',
      achieved: true,
      discovery: '2011-01-01T08:00:00.000Z' 
    };

    const res = await request(app).post('/api/v1/goals').send(goal1);
    console.log('passing result', res.body);
    expect(res.body).toEqual({
      id: '1',
      ...goal1,
    });

  });

  it('GET a goal', async () => {

    const goal1 = {
      description: 'choose a table',
      achieved: true,
      discovery: '2011-01-01T08:00:00.000Z' 
    };
    
    const goalWithId = await request(app).post('/api/v1/goals').send(goal1);
    const res = await request(app).get(`/api/v1/goals/${goalWithId.body.id}`);

    expect(res.body).toEqual({
      id: '1',
      ...goal1,
    });
  });

  it('GET all goals', async () => {
    const goal1 =  {
      id:'1',
      description: 'choose a table',
      achieved: true,
      discovery: '2011-01-01T08:00:00.000Z' 
    };

    const goal2 = {
      id:'2',
      description: 'eat today',
      achieved: true,
      discovery: '2011-01-01T08:00:00.000Z' 
    };

    const goal3 = {
      id:'3',
      description: 'complete alchemy',
      achieved: false,
      discovery: '2011-01-01T08:00:00.000Z' 
    };

    await request(app).post('/api/v1/goals').send(goal1);
    await request(app).post('/api/v1/goals').send(goal2);
    await request(app).post('/api/v1/goals').send(goal3);


    return request(app)
      .get('/api/v1/goals')
      .then((res) => {
        expect(res.body).toEqual([goal1, goal2, goal3]);
      });
  });

  it('PUT updates a single goal', async () => {
    const goal2 = {
      description: 'eat today',
      achieved: false,
      discovery: '2011-01-01T08:00:00.000Z' 
    };

    const goalWithId = await request(app).post('/api/v1/goals').send(goal2);

    const res = await request(app)
      .put(`/api/v1/goals/${goalWithId.body.id}`)
      .send({ achieved: true });
    expect(res.body).toEqual({ id:'1', ...goal2, achieved: true });
  });

  it('DELETE a single goal', async () => {
    const goal3 = {
      description: 'complete alchemy code lab',
      achieved: false,
      discovery: '2011-01-01T08:00:00.000Z' 
    };

    const goalWithId = await request(app).post('/api/v1/goals').send(goal3);

    const res = await request(app).delete(`/api/v1/goals/${goalWithId.body.id}`);
    expect(res.body).toEqual({ message: `sorry I no longer want to achieve ${goal3.description}` });
  });
});
