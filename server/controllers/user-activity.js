const express = require("express");
const service = require("../services/user-activity");

async function linkActivity(req, res, next) {
  const { atividadeId: activityId, usuarioId: userId } = req.body;

  try {
    const linked = await service.linkActivity(activityId, userId);

    if (linked)
      res.status(201).send({ message: "Successfully linked", data: linked });
  } catch (err) {
    console.error(`Error while linking activity `, err.message);
    next(err);
  }
}

async function unlinkActivity(req, res, next) {
  const { atividadeId: activityId, usuarioId: userId } = req.body;

  if (!activityId && !userId)
    return res.status(400).send({ message: "Invalid ids" });

  try {
    await service.unlinkActivity(activityId, userId);

    res.status(200).send({
      message: `Successfully unlinked: ${(activityId, userId)}`,
    });
  } catch (err) {
    console.error(`Error while unlinking activity `, err.message);
    next(err);
  }
}

async function assignGrade(req, res, next) {
  const { atividadeId: acitivityId, usuarioId: userId, nota: grade } = req.body;

  if (!acitivityId && !userId && !grade)
    return res.status(400).send({ message: "Invalid data" });

  try {
    const updated = await service.assignGrade(atividadeId, userId, grade);

    if (updated) {
      return res
        .status(200)
        .send({ message: "Successfully assigned", data: updated });
    }
  } catch (err) {
    console.error(`Error while assigning grade `, err.message);
    next(err);
  }
}

module.exports = {
  linkActivity,
  unlinkActivity,
  assignGrade,
};
