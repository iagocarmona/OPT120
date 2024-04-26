const moment = require("moment");
const db = require("../configs/db");
const helper = require("../helper");

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

async function deleteById(id) {
  const exists = await getOneById(id);
  if (!exists) throw new Error("Activity not found");

  return await db.query(`DELETE FROM atividades WHERE id = ?`, [id]);
}

async function getOneById(id) {
  const result = await db.query(`SELECT * FROM atividades WHERE id = ?`, [id]);

  if (!result[0]) throw new Error("Activity not found");

  return result[0];
}

async function list() {
  const rows = await db.query(`SELECT * FROM atividades ORDER BY id DESC`);
  return helper.emptyOrRows(rows);
}

module.exports = {
  list,
  create,
  update,
  deleteById,
  getOneById,
};
