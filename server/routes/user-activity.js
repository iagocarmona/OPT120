const express = require("express");
const router = express.Router();
const controller = require("../controllers/user-activity");
const middleware = require("../middlewares/auth");

router.post(
  "/vincular-atividade",
  middleware.validateAuth,
  controller.linkActivity
);

router.delete(
  "/desvincular-atividade",
  middleware.validateAuth,
  controller.unlinkActivity
);

router.put("/atribuir-nota", middleware.validateAuth, controller.assignGrade);

module.exports = router;
