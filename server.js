"use strict";
require("dotenv").config()
const express = require("express");
const app = express();
const models = require("./models");
const { userRouter, fruitRouter, basketRouter } = require("./router");
const PORT = process.env.PORT || 9090;

// middlewares
app.use(express.json());

// Routing
app.use("/user", userRouter);
app.use("/fruit", fruitRouter);
app.use("/basket", basketRouter);
// Starting the database
models.sequelize
  .sync()
  .then(() => console.log("DATABASE CONNECTED"))
  .catch((err) => console.log(err));

// error handling
app.use((err, req, res, next) => {
  const { message, code } = err;
  console.log(err);
  return res.status(code).json({ data: null, err: message });
});
app.listen(PORT, () => console.log(`SERVER CONNECTED ON PORT ${PORT}`));
