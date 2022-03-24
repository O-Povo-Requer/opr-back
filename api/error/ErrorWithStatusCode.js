class ErrorWithStatusCode extends Error {
    constructor(message, statusCode) {
        super(message)

        this.name = this.constructor.name

        Error.captureStackTrace(this, this.constructor)

        this.statusCode = statusCode
    }

    statusCode() {
        return this.statusCode
    }

}

module.exports = ErrorWithStatusCode