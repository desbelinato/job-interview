const { checkObjInterface } = require("@desbelinato/utils");

/**
 * In an effort to standardize REST API error handling, the IETF devised 
 * RFC 7807, which creates a generalized error-handling schema.
 * @see {@link https://datatracker.ietf.org/doc/html/rfc7807 rfc7807}
 * 
 * This schema is composed of five parts:
 *  1. type – a URI identifier that categorizes the error
 *  2. title – a brief, human-readable message about the error
 *  3. status – the HTTP response code (optional)
 *  4. detail – a human-readable explanation of the error
 *  5. instance – a URI that identifies the specific occurrence of the error
 * 
 * @property {string} type
 * @property {string} title
 * @property {number} [status=undefined]
 * @property {string} [detail=undefined]
 * @property {string} [instance=undefined]
 * 
 * @example
 * {
 *    "type": "/errors/incorrect-user-pass",
 *    "title": "Incorrect username or password.",
 *    "status": 401,
 *    "detail": "Authentication failed due to incorrect username or password.",
 *    "instance": "/login/log/abc123"
 * }
 */
class IAPIError {
    type = ''; // a URI identifier that categorizes the error
    title = ''; // a brief, human-readable message about the error
    status; // the HTTP response code (optional)
    detail; // a human-readable explanation of the error
    instance; // a URI that identifies the specific occurrence of the error

    /**
     * 
     * @param {Object} data
     * @param {string} data.type
     * @param {string} data.title
     * @param {number} [data.status=undefined]
     * @param {string} [data.detail=undefined]
     * @param {string} [data.instance=undefined]
     */
    constructor(data) {
        checkObjInterface(data, this);
    }
}

module.exports = IAPIError;
