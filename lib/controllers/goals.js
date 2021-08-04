/* eslint-disable indent */
import { Router } from 'express';
import Goal from '../models/goal';
import GoalService from '../services/goalService';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const goal = await GoalService.createGoal(req.body);
      res.send(goal);
    } catch (err) {
      next(err);
    }
  }).get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const goal = await Goal.getById(id);
      res.send(goal);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const goals = await Goal.getAll();
      res.send(goals);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { description, achieved, discovery } = req.body;
      const updatedGoal = await Goal.updateById(id, {
        description,
        achieved,
        discovery
      });
      res.send(updatedGoal);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const goal = await Goal.deleteById(id);
      res.send({
        message: `sorry I no longer want to achieve ${goal.description}`,
      });
    } catch (err) {
      next(err);
    }
  })
  ;


