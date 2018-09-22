class HttpError extends Error {
  constructor(name, message, status, body = null) {
    super(message);
    this.name = name;
    this.message = message;
    this.httpStatus = status;
    this.body = body;
  }
}

module.exports = HttpError;
