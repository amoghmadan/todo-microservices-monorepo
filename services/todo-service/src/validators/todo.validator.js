const Joi = require("joi");

const { PAGE_SIZE } = require("../settings");

const createTaskSchema = Joi.object({
  description: Joi.string().min(1).required(),
  status: Joi.string().valid("TODO", "IN_PROGRESS", "DONE").optional(),
});

const updateTaskSchema = Joi.object({
  description: Joi.string().min(1).required(),
  status: Joi.string().valid("TODO", "IN_PROGRESS", "DONE").required(),
});

const partialUpdateTaskSchema = Joi.object({
  description: Joi.string().min(1),
  status: Joi.string().valid("TODO", "IN_PROGRESS", "DONE"),
}).min(1); // At least one field required

const taskQuerySchema = Joi.object({
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(PAGE_SIZE)
    .description("Number of items per page."),
  offset: Joi.number()
    .integer()
    .min(0)
    .default(0)
    .description("Number of items to skip for pagination."),
  status: Joi.string()
    .valid("TODO", "IN_PROGRESS", "DONE")
    .optional()
    .description("Status of the task."),
}).unknown(true);

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  partialUpdateTaskSchema,
  taskQuerySchema,
};
