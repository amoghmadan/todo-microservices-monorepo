const { Task } = require("../models");

async function createTask(data) {
  return await Task.create(data);
}

async function retrieveTask(id) {
  return await Task.findOne(id);
}

async function updateTask(id, data) {
  return await Task.findOneAndUpdate(id, data, { new: true });
}

async function partialUpdateTask(id, data) {
  return await Task.findOneAndUpdate(id, data, { new: true });
}

async function destroyTask(id) {
  return await Task.findOneAndDelete(id);
}

async function listTask(filters, limit, offset) {
  const results = await Task.find(filters)
    .limit(limit)
    .skip(offset)
    .sort({ createdAt: -1 });
  const count = await Task.countDocuments(filters);
  return { count, results };
}

module.exports = {
  listTask,
  createTask,
  retrieveTask,
  updateTask,
  partialUpdateTask,
  destroyTask,
};
