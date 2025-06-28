const { STATUS_CODES } = require("http");

const { ValidationError } = require("joi");

const { userValidator } = require("../validators");

async function gateway(request, response, next) {
  try {
    const user = {
      id: request.headers?.["x-user-id"],
      email: request.headers?.["x-user-email"],
    };
    request.user = await userValidator.headerValidator.validateAsync(user);
  } catch (e) {
    if (e instanceof ValidationError) {
      return response.status(401).json({ detail: STATUS_CODES["401"] });
    }
    next(e);
  }
  next();
}

module.exports = { gateway };
