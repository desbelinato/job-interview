"use strict";
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("pass", salt);

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        return queryInterface.bulkInsert("Users", [
            {
                email: "web@desbelinato.it",
                password: hash,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        return queryInterface.bulkDelete("Users", null, {});
    },
};
