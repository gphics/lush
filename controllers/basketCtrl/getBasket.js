const { Op } = require("sequelize");
const models = require("../../models");
const genRes = require("../../utils/genRes");

module.exports = async (req, res) => {
  try {
    const { title, userId } = req.query;
    if (!title && !userId) {
      const allBaskets = await models.basket.findAll({
        include: [{ model: models.user }],
      });
      return res.json(genRes(allBaskets));
    } else if (title) {
      const someBaskets = await models.basket.findAll({
        where: {
          title: { [Op.iLike]: `%${title}%` },
        },
        include: [{ model: models.user }],
      });
      return res.json(genRes(someBaskets));
    } else if (userId) {
      const someBaskets = await models.basket.findAll({
        where: {
          userId,
        },
        include: [{ model: models.user }],
      });
      return res.json(genRes(someBaskets));
    }
  } catch (error) {}
};
