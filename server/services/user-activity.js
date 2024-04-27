const db = require("../configs/db");

async function linkActivity(activityId, userId) {
  const exists = await getOneById(activityId, userId);

  if (!exists.error)
    return {
      error: {
        message: "Atividade já vinculada",
        statusCode: 400,
      },
    };

  await db.query(
    `INSERT INTO usuario_atividade (atividade_id, usuario_id) VALUES (?, ?)`,
    [activityId, userId]
  );

  return await getOneById(activityId, userId);
}

async function assignGrade(activityId, userId, grade) {
  await getOneById(activityId, userId);

  await db.query(
    `UPDATE usuario_atividade SET nota = ? WHERE atividade_id = ? AND usuario_id = ?`,
    [grade, activityId, userId]
  );

  return await getOneById(activityId, userId);
}

async function getOneById(activityId, userId) {
  const result = await db.query(
    `SELECT * FROM usuario_atividade WHERE atividade_id = ? AND usuario_id = ?`,
    [activityId, userId]
  );

  if (!result[0])
    return {
      error: {
        message: "Atividade não encontrada",
        statusCode: 404,
      },
    };

  return result[0];
}

async function unlinkActivity(activityId, userId) {
  await getOneById(activityId, userId);

  return await db.query(
    `DELETE FROM usuario_atividade WHERE atividade_id = ? AND usuario_id = ?`,
    [activityId, userId]
  );
}

async function finishActivity(activityId, userId) {
  const exists = await getOneById(activityId, userId);

  if (exists.entrega) {
    return {
      error: {
        message: "Atividade já finalizada",
        statusCode: 400,
      },
    };
  }

  await db.query(
    `UPDATE usuario_atividade SET entrega = ? WHERE atividade_id = ? AND usuario_id = ?`,
    [new Date(), activityId, userId]
  );

  return await getOneById(activityId, userId);
}

async function removeAllRelationsByActivity(activityId) {
  return await db.query(
    `DELETE FROM usuario_atividade WHERE atividade_id = ?`,
    [activityId]
  );
}

module.exports = {
  unlinkActivity,
  linkActivity,
  assignGrade,
  finishActivity,
  getOneById,
  removeAllRelationsByActivity,
};
