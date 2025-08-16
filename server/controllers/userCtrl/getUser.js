const models = require("../../models");
const genRes = require("../../utils/genRes");
const genError = require("../../utils/genError");
const { Op } = require("sequelize");
module.exports = async (req, res, next) => {
  try {
    const { username } = req.query;
    if (!username) {
      const users = await models.user.findAll();
      return res.json(genRes(users));
    }
    const users = await await models.user.findAll({
        where: {
            username: {
        [Op.iLike]:`%${username}%`
    }}})
    return res.json(genRes(users));
  } catch (error) {
    return next(genError(error.message, error.code || 400))
  }
};
