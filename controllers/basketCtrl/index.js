const createBasket = require("./createBasket");
const getBasket = require("./getBasket");

module.exports = [
  { action: createBasket, method: "post", path: "/create" },
  { action: getBasket, method: "get", path: "" },
];
