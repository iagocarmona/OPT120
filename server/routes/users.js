const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");
const middleware = require("../middlewares/auth");

router.get("/", middleware.validateAuth, controller.list);
router.put("/", middleware.validateAuth, controller.update);
router.delete("/:id", middleware.validateAuth, controller.remove);
router.get("/:id", middleware.validateAuth, controller.getOne);
router.post("/", controller.create);
router.post("/login", controller.login);

module.exports = router;
