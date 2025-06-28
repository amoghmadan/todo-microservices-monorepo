const { Router } = require("express");

const { todoController } = require("../../../controllers");
const { authentication } = require("../../../middlewares");

const todo = Router();

todo
  .route("/tasks")
  .get(authentication.gateway, todoController.listTask)
  .post(authentication.gateway, todoController.createTask);
todo
  .route("/tasks/:id")
  .get(authentication.gateway, todoController.retrieveTask)
  .put(authentication.gateway, todoController.updateTask)
  .patch(authentication.gateway, todoController.partialUpdateTask)
  .delete(authentication.gateway, todoController.destroyTask);

module.exports = todo;
