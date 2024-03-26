const express = require("express");
const router = express.Router();
const service = require("../services/activities");

router.get("/", async function (req, res, next) {
  try {
    res.status(200).send({
      message: "Successfully listed activities",
      data: await service.list(),
    });
  } catch (err) {
    console.error(`Error while getting activities `, err.message);
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  const { titulo: title, descricao: description, data: date } = req.body.data;

  try {
    const created = await service.create(title, description, date);

    if (created)
      res.status(201).send({ message: "Successfully created", data: created });
  } catch (err) {
    console.error(`Error while creating activity `, err.message);
    next(err);
  }
});

router.put("/", async function (req, res, next) {
  const {
    id,
    titulo: title,
    descricao: description,
    data: date,
  } = req.body.data;

  if (!id || id < 0 || typeof id !== "number")
    return res.status(400).send({ message: "Invalid id" });

  if (!title || !description || !date)
    return res.status(400).send({ message: "Invalid data" });

  try {
    const updated = await service.update(id, title, description, date);

    if (updated) {
      return res
        .status(200)
        .send({ message: "Successfully updated", data: updated });
    }
  } catch (err) {
    console.error(`Error while updating activity `, err.message);
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
    console.error(`Error while deleting activity `, err.message);
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
    console.error(`Error while retrieving activity `, err.message);
    next(err);
  }
});

module.exports = router;
