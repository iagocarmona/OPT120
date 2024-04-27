const express = require("express");
const router = express.Router();
const controller = require("../controllers/user-activity");
const middleware = require("../middlewares/auth");

router.post(
  "/vincular-atividade",
  middleware.validateAuth,
  controller.linkActivity
);

router.post(
  "/desvincular-atividade",
  middleware.validateAuth,
  controller.unlinkActivity
);

router.put("/atribuir-nota", middleware.validateAuth, controller.assignGrade);
router.put("/entregar", middleware.validateAuth, controller.finishActivity);

module.exports = router;
