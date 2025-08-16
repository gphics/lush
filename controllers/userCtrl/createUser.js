const models = require("../../models");
const genError = require("../../utils/genError");
const genRes = require("../../utils/genRes");

module.exports = async (req, res, next) => {

  try {
    const { password } = req.body
    // validating password length
    if (!password) return next(genError("password must be provided"))
    if(password.length < 6) return next(genError("password length must be greater than 6"))
    const user = await models.user.create({ ...req.body })
    return res.status(200).json(genRes(user))
  } catch (error) {
    return next(genError(error.message))
  }
};
