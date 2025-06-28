const { todoRepository } = require("../repositories");
const { buildPaginationUrls } = require("../utils/pagination");

async function createTask(taskData) {
  return await todoRepository.createTask(taskData);
}

async function retrieveTask(id, user) {
  const task = await todoRepository.retrieveTask({ _id: id, user: user });
  if (!task) throw new Error("Task not found");
  return task;
}

async function updateTask(id, user, data) {
  const task = await todoRepository.updateTask(
    {
      _id: id,
      "user.id": user.id,
      "user.email": user.email,
    },
    data
  );
  if (!task) throw new Error("Task not found or update failed");
  return task;
}

async function partialUpdateTask(id, user, data) {
  const task = await todoRepository.partialUpdateTask(
    {
      _id: id,
      "user.id": user.id,
      "user.email": user.email,
    },
    data
  );
  if (!task) throw new Error("Task not found or update failed");
  return task;
}

async function destroyTask(id, user) {
  const task = await todoRepository.destroyTask({
    _id: id,
    "user.id": user.id,
    "user.email": user.email,
  });
  if (!task) throw new Error("Task not found or delete failed");
  return task;
}

/**
 * List task service.
 * @param {object} user
 * @param {object} query
 * @param {string} baseUrl
 * @returns {object}
 */
async function listTask(user, query, baseUrl) {
  const { limit, offset, status } = query;
  const filters = { "user.id": user.id, "user.email": user.email };
  if (status) filters.status = status;
  const data = await todoRepository.listTask(filters, limit, offset);
  const { nextUrl, prevUrl } = buildPaginationUrls(
    baseUrl,
    limit,
    offset,
    data.count,
    query
  );
  return { next: nextUrl, previous: prevUrl, ...data };
}

module.exports = {
  listTask,
  createTask,
  retrieveTask,
  updateTask,
  partialUpdateTask,
  destroyTask,
};
