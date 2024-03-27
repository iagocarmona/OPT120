const express = require("express");
const router = express.Router();
const service = require("../services/users");

router.post("/vincular-atividade", async function (req, res, next) {
  const { atividadeId: activityId, usuarioId: userId } = req.body.data;

  try {
    const created = await service.linkActivity(activityId, userId);

    if (created)
      res.status(201).send({ message: "Successfully created", data: created });
  } catch (err) {
    console.error(`Error while creating user `, err.message);
    next(err);
  }
});

module.exports = router;
