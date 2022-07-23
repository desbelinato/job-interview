"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            uid: {
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                isEmail: true,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Users");
    },
};
