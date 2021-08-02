
  import pool from '../utils/pool';

  export default class Goal {
    id;
    description;
    achieved;
    discovery;

  constructor(row) {
    this.id = row.id;
    this.description = row.description;
    this.achieved = row.achieved;
    this.discovery = row.discovery;
  }

  static async insert({ description, achieved, discovery }) {
    const { rows } = await pool.query(
      `INSERT INTO goals (description, achieved, discovery) VALUES ($1, $2, $3) RETURNING *`,
      [description, achieved, discovery]
    );
    return new Goal(rows[0]);
  }

  
  // static async getById(id) {
  //   const { rows } = await pool.query(
  //     `SELECT * 
  //     FROM goals 
  //     WHERE id=$1`,
  //     [id]
  //   );
  //   return new Goal(rows[0]);
  // }
  // static async getAll() {
  //   const { rows } = await pool.query(
  //     `SELECT * 
  //     FROM goals`
  //   );
  //   return rows.map((row) => new Goal(row));
  // }

  // static async updateById(id, { description, achieved, discovery }) {
  //   const currentGoal = await Goal.getById(id);
  //   const newDescription = description ?? currentGoal.description;
  //   const newAchieved = achieved ?? currentGoal.achieved;
  //   const newDiscovery = discovery ?? currentGoal.discovery;

  //   const { rows } = await pool.query(
  //     `UPDATE homeworks 
  //     SET description=$1, achieved=$2, discovery=$3 
  //     WHERE id=$4 RETURNING *`,
  //     [newDescription, newAchieved, newDiscovery, id]
  //   );
  //   return new Goal(rows[0]);
  // }

  // static async deleteById(id) {
  //   const { rows } = await pool.query(
  //     `DELETE FROM goals
  //     WHERE id=$1
  //     RETURNING *`,
  //     [id]
  //   );
  //   return new Goal(rows[0]);
  // }
}
