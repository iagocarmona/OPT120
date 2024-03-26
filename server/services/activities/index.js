const db = require("../db");
const helper = require("../../helper");

async function create(title, description, date) {
  if (title && description) {
    try {
      const result = await db.query(
        `INSERT INTO atividades (titulo, descricao, data) VALUES (?, ?, ?)`,
        [title, description, date ?? new Date()]
      );

      const insertedId = result.insertId;
      const created = await db.query(`SELECT * FROM atividades WHERE id = ?`, [
        insertedId,
      ]);

      return created[0];
    } catch (error) {
      throw new Error("Error while creating activity");
    }
  } else {
    throw new Error(error);
  }
}

async function update(id, title, description, date) {
  try {
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
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteById(id) {
  try {
    const exists = await getOneById(id);
    if (!exists) throw new Error("Activity not found");

    return await db.query(`DELETE FROM atividades WHERE id = ?`, [id]);
  } catch (error) {
    throw new Error(error);
  }
}

async function getOneById(id) {
  try {
    const result = await db.query(`SELECT * FROM atividades WHERE id = ?`, [
      id,
    ]);

    if (!result[0]) throw new Error("Activity not found");

    return result[0];
  } catch (error) {
    throw new Error(error);
  }
}

async function list() {
  const rows = await db.query(`SELECT * FROM atividades`);
  return helper.emptyOrRows(rows);
}

module.exports = {
  list,
  create,
  update,
  deleteById,
  getOneById,
};
