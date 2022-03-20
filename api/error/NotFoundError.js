const ErrorWithStatusCode = require("./ErrorWithStatusCode")

class NotFoundError extends ErrorWithStatusCode {
    constructor(message) {
        super(message, 404)
    }
}

module.exports = NotFoundError