const Joi = require("joi");

const headerValidator = Joi.object({
  id: Joi.number().required(),
  email: Joi.string().email().required(),
});

module.exports = { headerValidator };
