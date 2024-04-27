const jwt = require("jsonwebtoken");

async function validateAuth(req, res, next) {
  const token = req.headers["x-auth-token"];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Token de autenticação não encontrado" });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token de autenticação inválido" });
  }
}

module.exports = {
  validateAuth,
};
