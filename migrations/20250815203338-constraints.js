"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // user table constraints
    await queryInterface.addConstraint("users", {
      fields: ["email", "username"],
      type: "unique",
      name: "unique_fields",
    });

    // fruit table constraints
    await queryInterface.addConstraint("fruits", {
      fields: ["name"],
      type: "unique",
      name: "unique_fruit_name",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
