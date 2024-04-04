const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const usersRouter = require("./routes/users");
const activitiesRouter = require("./routes/activities");
const userActivityRouter = require("./routes/user-activity");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/usuarios", usersRouter);
app.use("/atividades", activitiesRouter);
app.use("/usuario-atividade", userActivityRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
