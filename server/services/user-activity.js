const db = require("../configs/db");

async function linkActivity(activityId, userId) {
  if (!activityId && !userId) return;

  try {
    const result = await db.query(
      `INSERT INTO usuario_atividade (atividade_id, usuario_id) VALUES (?, ?)`,
      [activityId, userId]
    );

    const insertedId = result.insertId;
    const created = await db.query(
      `SELECT * FROM usuario_atividade WHERE id = ?`,
      [insertedId]
    );

    return created[0];
  } catch (error) {
    throw new Error(error);
  }
}

async function assignGrade(activityId, userId, grade) {
  if (!activityId && !userId && !grade) return;

  try {
    await db.query(
      `UPDATE usuario_atividade SET nota = ? WHERE atividade_id = ? AND usuario_id = ?`,
      [grade, activityId, userId]
    );

    const updatedActivity = await db.query(
      `SELECT * FROM usuario_atividade WHERE atividade_id = ? AND usuario_id = ?`,
      [activityId, userId]
    );

    if (updatedActivity.length > 0) {
      return updatedActivity[0];
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function getOneById(activityId, userId) {
  try {
    const result = await db.query(
      `SELECT * FROM usuario_atividade WHERE atividade_id = ? AND usuario_id = ?`,
      [activityId, userId]
    );

    if (!result[0]) throw new Error("Activity not found");

    return result[0];
  } catch (error) {
    throw new Error(error);
  }
}

async function unlinkActivity(activityId, userId) {
  try {
    const exists = await getOneById(activityId, userId);
    if (!exists) throw new Error("Activity not found");

    return await db.query(
      `DELETE FROM usuario_atividade WHERE atividade_id = ? AND usuario_id = ?`,
      [activityId, userId]
    );
  } catch (error) {
    throw new Error(error);
  }
}

async function getActivitiesByUserId(userId) {
  const rows = await db.query(
    `SELECT usuario_id FROM usuario_atividade WHERE usuario_id = ?`,
    [userId]
  );

  return helper.emptyOrRows(rows);
}

module.exports = {
  unlinkActivity,
  linkActivity,
  getActivitiesByUserId,
  assignGrade,
};
