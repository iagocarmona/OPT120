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
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
  emptyOrRows,
  comparePasswords,
  encryptPassword,
};
