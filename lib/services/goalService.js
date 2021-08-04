// const Goal = require('../models/Goal');
import Goal from '../models/goal';
// const { sendSms } = require('../utils/twilio');
import  sendSms  from '../utils/twilio';

export default class GoalService {
  static async createGoal(goalBody) {
    await sendSms(
      process.env.MY_NUMBER,
      `You have a new goal!: ${goalBody.description}`
    );
    const goal = await Goal.insert(goalBody);
    return goal;
  }


}
