const moment = require("moment");
const db = require("../configs/db");
const helper = require("../helper");
const userActivityService = require("../services/user-activity");

async function create(title, description, date) {
  const result = await db.query(
    `INSERT INTO atividades (titulo, descricao, data) VALUES (?, ?, ?)`,
    [title, description, date]
  );

  const insertedId = result.insertId;
  const created = await db.query(`SELECT * FROM atividades WHERE id = ?`, [
    insertedId,
  ]);

  return created[0];
}

async function update(id, title, description, date) {
  const exists = await getOneById(id);
  if (!exists) throw new Error("activity not found");

  let updateFields = [];
  let values = [];

  if (title) {
    updateFields.push("titulo = ?");
    values.push(title);
  }
  if (description) {
    updateFields.push("descricao = ?");
    values.push(description);
  }
  if (date) {
    updateFields.push("data = ?");
    values.push(date);
  }

  if (updateFields.length > 0) {
    values.push(id);

    const updateQuery = `UPDATE atividades SET ${updateFields.join(
      ", "
    )} WHERE id = ?`;

    await db.query(updateQuery, values);

    const updatedActivity = await db.query(
      `SELECT * FROM atividades WHERE id = ?`,
      [id]
    );

    if (updatedActivity.length > 0) {
      return updatedActivity[0];
    }
  } else {
    throw new Error("Error while updating activity");
  }
}

async function deleteById(id, userId) {
  await getOneById(id);
  await userActivityService.removeAllRelationsByActivity(id);

  return await db.query(`DELETE FROM atividades WHERE id = ?`, [id]);
}

async function getOneById(id) {
  const result = await db.query(`SELECT * FROM atividades WHERE id = ?`, [id]);

  if (!result[0])
    return {
      error: {
        message: "Atividade não encontrada",
        statusCode: 400,
      },
    };

  return result[0];
}

async function list() {
  const rows = await db.query(`SELECT * FROM atividades ORDER BY id DESC`);
  return helper.emptyOrRows(rows);
}

async function listMyActivities(userId) {
  const rows = await db.query(
    `SELECT a.* FROM atividades a INNER JOIN usuario_atividade ua ON a.id = ua.atividade_id AND ua.usuario_id = ? ORDER BY id DESC`,
    [userId]
  );

  return helper.emptyOrRows(rows);
}

module.exports = {
  list,
  create,
  update,
  deleteById,
  getOneById,
  listMyActivities,
};
