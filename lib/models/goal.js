const { Router } = require('express');
const Goal   = require('../models/Grder');


module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const goal = await Goal.createGoal(req.body);
      res.send(goal);
    } 
    catch(err) {
      next(err);
    }
  });
