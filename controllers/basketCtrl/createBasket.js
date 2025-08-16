const models = require("../../models");
const genRes = require("../../utils/genRes");
const genError = require("../../utils/genError");

module.exports = async (req, res, next) => {
  try {
    const { fruitItems, title, userId } = req.body;
    // validating fruit items
    if (!fruitItems || !fruitItems.length || !Array.isArray(fruitItems)) {
      return next(genError("fruit items must be an array"));
    }
    fruitItems.forEach(({name, quantity}) => {
      if (!name || !quantity) {
        return next(genError("name and quantity must be provided for each fruit in fruit items"));
      }
    })
    // validating owner and title
    if ( !title || !userId) {
      return next(genError("all required parameter must be provided"));
    }
    
    const basket = await models.basket.create({ fruitItems, title, userId });
    return res.json(genRes(basket))
  } catch (error) {
    return next(genError(error.message, error.code || 400));
  }
};

// fruit item construct
// const obj = {
//   name: "Apple",
//   quantity: 2,
//   // auto populate
//   cost:0
// };
