const logger = require("../services/logger");
const { User } = require("../db/models");
const IAPIError = require("../interfaces/APIError.interface");

/**
 * @api {post} /api/user Create user
 * @apiName Create new user
 * @apiPermission admin
 * @apiGroup User
 *
 * @apiParam  {String} [email] email
 * @apiParam  {String} [password] password
 *
 * @apiSuccess (200) {IUser} mixed `User` object
 */
async function create(req, res) {
    console.log("User logged:", req?.user, req?.user?.email);
    try {
        const { email, password } = req.body;
        const newUser = await User.create({ email, password });
        res.status(200).json(newUser);
    } catch (error) {
        logger.error(`[api][user][create] |`, error);
        const apiError = new IAPIError({
            type: "errors/participant/unexpected-error",
            title: "Generic error",
            detail: "A generic error occurred on the server",
        });
        res.status(500).json(apiError);
    }
}

module.exports = {
    create,
};
