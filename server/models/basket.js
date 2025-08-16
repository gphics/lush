"use strict";
const { Model } = require("sequelize");
const models = require("./index");
module.exports = (sequelize, DataTypes) => {
  class basket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user);
      // this was just used to build ERD
      this.belongsToMany(models.fruit, { through: "fruitBasket" });
    }
  }
  basket.init(
    {
      title: DataTypes.STRING,
      totalCost: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      fruitItems: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: "basket",
    }
  );

  // 
  basket.beforeSave("autoPopulate", async (instance, options) => {
    const fruitItems = instance.fruitItems;

    // creating promise array
    const mapped = fruitItems.map(async ({ name, quantity }) => {
      const fruit = await instance.sequelize.models.fruit.findOne({
        where: { name },
      });
      if (!fruit) throw new Error(`${name} fruit does not exist`);
      const { price } = fruit;
      const cost = price * quantity;
      return { name, price, cost, quantity };
    });

    const processedFruit = await Promise.all(mapped);
    
    // calculating totalCost
    let totalCost = 0
    processedFruit.map(({ cost }) => {
      totalCost += cost
    })
    instance.fruitItems = processedFruit;
    instance.totalCost = totalCost
  });
  return basket;
};
