const express = require("express");
const router = express.Router();
const service = require("../services/users");

router.get("/", async function (req, res, next) {
  try {
    res.status(200).send({
      message: "Successfully listed users",
      data: await service.list(),
    });
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  const { nome: name, email, senha: password } = req.body;

  try {
    const created = await service.create(name, email, password);

    if (created)
      res.status(201).send({ message: "Successfully created", data: created });
  } catch (err) {
    console.error(`Error while creating user `, err.message);
    next(err);
  }
});

router.post("/login", async function (req, res, next) {
  const { email, senha: password } = req.body;

  try {
    const token = await service.login(email, password);

    if (token)
      res.status(201).send({ message: "Successfully login", data: token });
  } catch (err) {
    console.error(`Error while creating user `, err.message);
    next(err);
  }
});

router.put("/", async function (req, res, next) {
  const { id, nome: name, email } = req.body;

  if (!id || id < 0 || typeof id !== "number")
    return res.status(400).send({ message: "Invalid id" });

  if (!name || !email) return res.status(400).send({ message: "Invalid data" });

  try {
    const updated = await service.update(id, name, email);

    if (updated) {
      return res
        .status(200)
        .send({ message: "Successfully updated", data: updated });
    }
  } catch (err) {
    console.error(`Error while updating user `, err.message);
    next(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;

  if (!id) return res.status(400).send({ message: "Invalid id" });

  try {
    await service.deleteById(id);

    res.status(200).send({ message: `Successfully deleted id: ${id}` });
  } catch (err) {
    console.error(`Error while deleting user `, err.message);
    next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;

  if (!id) return res.status(400).send({ message: "Invalid id" });

  try {
    const acitivity = await service.getOneById(id);

    res
      .status(200)
      .send({ message: `Successfully retrieved id: ${id}`, data: acitivity });
  } catch (err) {
    console.error(`Error while retrieving user `, err.message);
    next(err);
  }
});

module.exports = router;
