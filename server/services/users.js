const db = require("../configs/db");
const helper = require("../helper");
const jwt = require("jsonwebtoken");

async function login(email, password) {
  const user = await getUserByEmail(email);
  if (!user)
    return {
      error: {
        message: "Usuário não encontrado",
        statusCode: 404,
      },
    };

  const isPasswordMatch = await helper.comparePasswords(password, user.senha);

  if (!isPasswordMatch)
    return {
      error: {
        message: "Senha incorreta",
        statusCode: 400,
      },
    };

  const secret = "secret";

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.nome,
    },
    secret,
    { expiresIn: "1d" }
  );

  return token;
}

async function create(name, email, password) {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already exists");
  }

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
}

async function update(id, name, email) {
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

    const updatedUser = await db.query(`SELECT * FROM usuarios WHERE id = ?`, [
      id,
    ]);

    if (updatedUser.length > 0) {
      return updatedUser[0];
    }
  }
}

async function deleteById(id) {
  const exists = await getOneById(id);
  if (!exists) throw new Error("User not found");

  return await db.query(`DELETE FROM usuarios WHERE id = ?`, [id]);
}

async function getOneById(id) {
  const result = await db.query(`SELECT * FROM usuarios WHERE id = ?`, [id]);

  if (!result[0]) throw new Error("User not found");

  return result[0];
}

async function getUserByEmail(email) {
  const result = await db.query(`SELECT * FROM usuarios WHERE email = ?`, [
    email,
  ]);

  return result[0];
}

async function list() {
  const rows = await db.query(`SELECT * FROM usuarios ORDER BY id DESC`);
  return helper.emptyOrRows(rows);
}

module.exports = {
  list,
  create,
  update,
  deleteById,
  getOneById,
  login,
};
