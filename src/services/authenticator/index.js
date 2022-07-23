require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { User } = require("../../db/models");

class Authenticator {
    /**
     * check user credentials and return user or throw an error
     * @param {string} email
     * @param {string} password
     * @returns {User} user without password
     */
    async checkUser(email, password) {
        let user = await User.scope("withPassword").findOne({
            where: { email },
        });
        const test = await bcryptjs.compare(password, user.password);
        if (user && (await bcryptjs.compare(password, user.password))) {
            delete user.password;
            return user;
        } else {
            throw new Error("Unauthorized user");
        }
    }

    /**
     * Create signed token
     * @param {Object} payload
     * @param {string} exp "1ms"|"1s"|"1m"|"1h"|"1d"|"1y"
     * @returns
     */
    token(payload, exp) {
        return jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: exp });
    }

    logout(payload) {
        return jwt.sign(payload, '', { expiresIn: '1ms' });
    }

    /**
     * Check token and decode payload
     * @async
     * @param {*} token
     * @returns {Promise<Object>} payload decoded
     */
    async verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET_TOKEN, (error, payload) => {
                if (error) {
                    return reject(error);
                }
                resolve(payload);
            });
        });
    }
}

const authenticator = new Authenticator();

/**
 * Singleton system to check and get user by credentials,
 * create or verify jwt tokens.
 * Use user model.
 * @module Authenticator
 * @returns {Authenticator} instannce of Authenticator
 */
module.exports = authenticator;
