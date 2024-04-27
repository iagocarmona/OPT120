const express = require("express");
const router = express.Router();
const controller = require("../controllers/activities");
const middleware = require("../middlewares/auth");

router.get("/", middleware.validateAuth, controller.list);
router.post("/", middleware.validateAuth, controller.create);
router.put("/", middleware.validateAuth, controller.update);
router.delete("/:id", middleware.validateAuth, controller.remove);
router.get("/minhas", middleware.validateAuth, controller.listMyActivities);
router.get("/:id", middleware.validateAuth, controller.getOne);

module.exports = router;
