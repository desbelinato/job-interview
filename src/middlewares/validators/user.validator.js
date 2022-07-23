const { body, validationResult } = require("express-validator");
const IAPIError = require("../../interfaces/APIError.interface");
// @todo : use translation module, from db or files
const messages = {
    BAD_EMAIL: "email bad formatted or missing",
    BAD_PASSWORD: "password missing",
    PASSWORD_CONFIRMATION_MISSING:
        "passwordConfirmation field must have the same value as the password field",
};

/**
 *
 * @param {string} method 'create'
 * @returns
 */
module.exports.validate = (method) => {
    switch (method) {
        case "create":
            return [
                body("email", messages.BAD_EMAIL).isEmail().normalizeEmail(),
                body("password", messages.BAD_PASSWORD).exists(),
                body(
                    "passwordConfirmation",
                    messages.PASSWORD_CONFIRMATION_MISSING
                )
                    .exists()
                    .custom((value, { req }) => value === req.body.password),
                (req, res, next) => {
                    // Finds the validation errors in this request and
                    // wraps them in an object with handy functions
                    const errors = validationResult(req);
                    if (!errors.isEmpty()) {
                        res.setHeader(
                            "content-type",
                            "application/problem+json"
                        );
                        const errorsData = errors.array();
                        const apiError = new IAPIError({
                            type: "errors/participant/validation-error",
                            title: "Your request parameters didn't validate.",
                            detail: errorsData[0]?.msg,
                        });
                        return res.status(400).json(apiError);
                    }
                    next();
                },
            ];
    }
};
