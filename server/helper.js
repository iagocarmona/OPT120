const bcrypt = require("bcrypt");

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

async function encryptPassword(password) {
  try {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw new Error("Error while encrypting: " + error.message);
  }
}

async function comparePasswords(password, hashedPassword) {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error("Erro ao comparar as senhas: " + error.message);
  }
}

module.exports = {
  emptyOrRows,
  comparePasswords,
  encryptPassword,
};
