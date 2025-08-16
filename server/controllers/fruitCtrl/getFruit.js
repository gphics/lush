const models = require("../../models");
const genRes = require("../../utils/genRes");
const genError = require("../../utils/genError");
const { Op } = require("sequelize");

module.exports = async (req, res, next) => {
  try {
    const { name: fruitName } = req.query;
    if (!fruitName) {
      const allFruits = await models.fruit.findAll();
      return res.json(genRes(allFruits));
    }
    const someFruits = await models.fruit.findAll({
      where: {
        name: {
          [Op.iLike]: `%${fruitName}%`,
        },
      },
    });
    return res.json(genRes(someFruits));
  } catch (error) {
    return next(genError(error.message, error.code || 400));
  }
};
