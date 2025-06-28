const { ValidationError } = require("joi");

const { todoService } = require("../services");
const { todoValidator } = require("../validators");

/**
 * List all the tasks for a user.
 * @param {express.Request} request
 * @param {express.Response} response
 * @returns {express.Response}
 */
async function listTask(request, response) {
  try {
    const validatedData = await todoValidator.taskQuerySchema.validateAsync(
      request.query
    );
    const baseUrl = `${request.protocol}://${request.get("host")}${
      request.baseUrl
    }${request.path}`;
    const tasks = await todoService.listTask(
      request.user,
      validatedData,
      baseUrl
    );
    return response.status(200).json(tasks);
  } catch (err) {
    if (err instanceof ValidationError) {
      return response.status(400).json(err.details);
    }
    return response.status(500).json({ detail: err.message });
  }
}

/**
 * Create a new task for the user.
 * @param {express.Request} request
 * @param {express.Response} response
 * @returns {express.Response}
 */
async function createTask(request, response) {
  try {
    const validatedData = await todoValidator.createTaskSchema.validateAsync(
      request.body
    );
    const task = await todoService.createTask({
      user: request.user,
      ...validatedData,
    });
    return response.status(201).json(task);
  } catch (err) {
    if (err instanceof ValidationError) {
      return response.status(400).json(err.details);
    }
    return response.status(500).json({ error: err.message });
  }
}

async function retrieveTask(request, response) {
  try {
    const task = await todoService.retrieveTask(
      request.params.id,
      request.user
    );
    return response.status(200).json(task);
  } catch (err) {
    return response.status(500).json({ error: err.message });
  }
}

async function updateTask(request, response) {
  try {
    const validatedData = await todoValidator.updateTaskSchema.validateAsync(
      request.body
    );
    const task = await todoService.updateTask(
      request.params.id,
      request.user,
      validatedData
    );
    return response.status(200).json(task);
  } catch (err) {
    if (err instanceof ValidationError) {
      return response.status(400).json(err.details);
    }
    return response.status(500).json({ error: err.message });
  }
}

async function partialUpdateTask(request, response) {
  try {
    const validatedData =
      await todoValidator.partialUpdateTaskSchema.validateAsync(request.body);
    const task = await todoService.partialUpdateTask(
      request.params.id,
      request.user,
      validatedData
    );
    return response.status(200).json(task);
  } catch (err) {
    if (err instanceof ValidationError) {
      return response.status(400).json(err.details);
    }
    return response.status(500).json({ error: err.message });
  }
}

async function destroyTask(request, response) {
  try {
    await todoService.destroyTask(request.params.id, request.user);
    return response.status(204).json(null);
  } catch (err) {
    return response.status(500).json({ error: err.message });
  }
}

module.exports = {
  listTask,
  createTask,
  retrieveTask,
  updateTask,
  partialUpdateTask,
  destroyTask,
};
