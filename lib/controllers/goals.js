/* eslint-disable indent */
import { Router } from 'express';
import Goal from '../models/goal';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const goal = await Goal.insert(req.body);
      res.send(goal);
    } catch (err) {
      next(err);
    }
  })
  ;


