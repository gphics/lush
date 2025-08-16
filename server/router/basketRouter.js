const express = require("express");
const basketCtrl = require("../controllers/basketCtrl");
const basketRouter = express.Router();

basketCtrl.map(({ action, method, path }) => {
  basketRouter[method](path, action);
});

module.exports = basketRouter;
