const service = require("../services/user-activity");

async function linkActivity(req, res, next) {
  const { atividadeId: activityId, usuarioId: userId } = req.body;

  try {
    const returned = await service.linkActivity(activityId, userId);

    if (returned.error) {
      res.status(returned.error.statusCode).send(returned);
    } else {
      res.status(201).send({ message: "Successfully linked", data: returned });
    }
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
    const returned = await service.unlinkActivity(activityId, userId);

    if (returned.error) {
      res.status(returned.error.statusCode).send(returned);
    } else {
      res
        .status(201)
        .send({ message: "Successfully unlinked", data: returned });
    }
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
    const returned = await service.assignGrade(acitivityId, userId, grade);

    if (returned.error) {
      res.status(returned.error.statusCode).send(returned);
    } else {
      res
        .status(201)
        .send({ message: "Successfully assigned grade", data: returned });
    }
  } catch (err) {
    console.error(`Error while assigning grade `, err.message);
    next(err);
  }
}

async function finishActivity(req, res, next) {
  const {
    atividadeId: acitivityId,
    usuarioId: userId,
    entrega: deliver,
  } = req.body;

  try {
    const returned = await service.finishActivity(acitivityId, userId, deliver);

    if (returned.error) {
      res.status(returned.error.statusCode).send(returned);
    } else {
      res
        .status(201)
        .send({ message: "Successfully finished activity", data: returned });
    }
  } catch (err) {
    console.error(`Error while finishing activity`, err.message);
    next(err);
  }
}

module.exports = {
  linkActivity,
  unlinkActivity,
  finishActivity,
  assignGrade,
};
