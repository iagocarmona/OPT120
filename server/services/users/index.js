const db = require("../db");
const helper = require("../../helper");

async function list() {
  const rows = await db.query(`SELECT * FROM usuarios`);
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

module.exports = {
  list,
};
