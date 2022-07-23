require("dotenv").config();
const logger = require("../../services/logger");
const IAPIError = require("../../interfaces/APIError.interface");
const authenticator = require("../../services/authenticator");
const maxAge = 1000 * 60 * 60;

async function userLogin(req, res, next) {
    const { email, password } = req.body;
    try {
        // Validate if user exist in our database
        const user = await authenticator.checkUser(email, password);
        req.token = authenticator.token({ email: user.email }, maxAge);
        req.tokenMaxAge = maxAge;
        req.user = user;
        next();
    } catch (error) {
        logger.error(`[mddlwares][auth] | unauthorized | `, error);
        res.setHeader("content-type", "application/problem+json");
        const apiError = new IAPIError({
            type: "errors/auth/signin",
            title: "Unauthorized",
            detail: "Unauthorized",
        });
        res.status(401).json(apiError);
    }
}

async function verifyToken(req, res, next) {
    try {
        const token = _tokenInHeaders(req);
        const decoded = await authenticator.verify(token);
        req.user = { email: decoded?.email };
    } catch (error) {
        logger.error(`[verifyToken]| error |`, error);
        const msg = error.code ? error.message : "Invalid Token";
        return res.status(error.code || 401).send(msg);
    }
    return next();
}

async function refreshToken(req, res, next) {
    try {
        const token = _tokenInHeaders(req);
        const decoded = await authenticator.verify(token);
        req.token = authenticator.token(decoded?.email, maxAge);
        req.tokenMaxAge = maxAge;
        req.user = { email: decoded?.email };
    } catch (error) {
        logger.error(`[refreshToken]| error |`, error);
        const msg = error.code ? error.message : "Invalid Token";
        return res.status(error.code || 401).send(msg);
    }
    return next();
}

async function userLogout(req, res, next) {
    try {
        const token = _tokenInHeaders(req);
        const decoded = await authenticator.verify(token);
        req.user = { email: decoded?.email };
    } catch (error) {
        logger.error(`[userLogout]| error |`, error);
        const msg = error.code ? error.message : "Invalid Token";
        return res.status(error.code || 401).send(msg);
    }
    return next();
}

function _tokenInHeaders(req) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        let error = new Error("A token is required for authentication");
        error.code = 403;
        throw error;
    }
    return token;
}

module.exports = { userLogin, verifyToken, refreshToken, userLogout };
