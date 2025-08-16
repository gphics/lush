const express = require("express");
const fruitCtrl = require("../controllers/fruitCtrl");
const fruitRouter = express.Router();

fruitCtrl.map(({ action, method, path }) => {
  fruitRouter[method](path, action);
});


module.exports = fruitRouter