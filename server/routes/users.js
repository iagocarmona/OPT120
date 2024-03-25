const express = require("express");
const router = express.Router();
const usersService = require("../services/users");

router.get("/", async function (req, res, next) {
  try {
    res.json(await usersService.list());
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

module.exports = router;
