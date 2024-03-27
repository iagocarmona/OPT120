const db = require("../configs/db");
const helper = require("../helper");

async function create(name, email, password) {
  if (name && email && password) {
    try {
      const encriptedPassword = await helper.encryptPassword(password);

      const result = await db.query(
        `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`,
        [name, email, encriptedPassword]
      );

      const insertedId = result.insertId;
      const created = await db.query(`SELECT * FROM usuarios WHERE id = ?`, [
        insertedId,
      ]);

      return created[0];
    } catch (error) {
      throw new Error("Error while creating User");
    }
  } else {
    throw new Error(error);
  }
}

async function update(id, name, email) {
  try {
    const exists = await getOneById(id);
    if (!exists) throw new Error("User not found");

    let updateFields = [];
    let values = [];

    if (name) {
      updateFields.push("nome = ?");
      values.push(name);
    }
    if (email) {
      updateFields.push("email = ?");
      values.push(email);
    }

    if (updateFields.length > 0) {
      values.push(id);

      const updateQuery = `UPDATE usuarios SET ${updateFields.join(
        ", "
      )} WHERE id = ?`;

      await db.query(updateQuery, values);

      const updatedUser = await db.query(
        `SELECT * FROM usuarios WHERE id = ?`,
        [id]
      );

      if (updatedUser.length > 0) {
        return updatedUser[0];
      }
    } else {
      throw new Error("Error while updating User");
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteById(id) {
  try {
    const exists = await getOneById(id);
    if (!exists) throw new Error("User not found");

    return await db.query(`DELETE FROM usuarios WHERE id = ?`, [id]);
  } catch (error) {
    throw new Error(error);
  }
}

async function getOneById(id) {
  try {
    const result = await db.query(`SELECT * FROM usuarios WHERE id = ?`, [id]);

    if (!result[0]) throw new Error("User not found");

    return result[0];
  } catch (error) {
    throw new Error(error);
  }
}

async function list() {
  const rows = await db.query(`SELECT * FROM usuarios`);
  return helper.emptyOrRows(rows);
}

module.exports = {
  list,
  create,
  update,
  deleteById,
  getOneById,
};
