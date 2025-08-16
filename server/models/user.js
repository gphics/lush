'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt")
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.basket)
    }
  }
  user.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "user already exists" },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "user already exists" },
        validate: {
          isEmail: { msg: "invalid email format" },
        },
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  // used for hashing the password
  user.beforeSave("hashPassword", (inst, options) => {
    const salt = bcrypt.genSaltSync()
    const hashedPassword = bcrypt.hashSync(inst.password, salt)
    inst.password = hashedPassword
  })
  return user;
};