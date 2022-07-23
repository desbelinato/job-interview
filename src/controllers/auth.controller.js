const logger = require("../services/logger");
const IAPIError = require("../interfaces/APIError.interface");

/**
 * @api {post} /api/auth/signin User Authentication
 * @apiName Auth user
 * @apiPermission public
 * @apiGroup Auth
 *
 * @apiParam  {String} [email] email
 * @apiParam  {String} [password] password
 *
 * @apiSuccess (200) {*} mixed `*` object
 */
async function signin(req, res) {
    try {
        res.cookie("jwt", req.token, {
            httpOnly: true,
            maxAge: req.tokenMaxAge, // 3hrs in ms
        });
        res.json({
            message: "SignIn",
            jwt: req.token,
            maxAge: req.tokenMaxAge,
        });
    } catch (error) {
        logger.error(`[api][auth] | signin | `, error);
        const apiError = new IAPIError({
            type: "errors/participant/unexpected-error",
            title: "Generic error",
            detail: "A generic error occurred on the server",
        });
        res.status(500).json(apiError);
    }
}

/**
 *
 */
async function refresh(req, res) {
    try {
        res.cookie("jwt", req.token, {
            httpOnly: true,
            maxAge: req.tokenMaxAge, // 3hrs in ms
        });
        res.json({
            message: "Refresh",
            jwt: req.token,
            maxAge: req.tokenMaxAge,
        });
    } catch (error) {
        logger.error(`[api][auth] | Refresh | `, error);
        const apiError = new IAPIError({
            type: "errors/participant/unexpected-error",
            title: "Generic error",
            detail: "A generic error occurred on the server",
        });
        res.status(500).json(apiError);
    }
}

/**
 *
 */
async function logout(req, res) {
    try {
        res.cookie("jwt", "", { maxAge: "1" });
        res.redirect("/login");
    } catch (error) {
        logger.error(`[api][auth] | Logout | `, error);
        const apiError = new IAPIError({
            type: "errors/participant/unexpected-error",
            title: "Generic error",
            detail: "A generic error occurred on the server",
        });
        res.status(500).json(apiError);
    }
}

module.exports = {
    signin,
    refresh,
    logout,
};
