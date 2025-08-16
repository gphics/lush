"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // creating the owner column on basket table and adding constraint
    await queryInterface.addColumn("baskets", "owner", {
      type: DataTypes.INTEGER,
    });
    await queryInterface.addConstraint("baskets", {
      type: "foreign key",
      fields: ["owner"],
      name:"fkey_owner",
      references: {
        table: "users",
        field:"id"
      }
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn("baskets", "owner")
    await queryInterface.removeConstraint("baskets", "fkey_owner")
  },
};
