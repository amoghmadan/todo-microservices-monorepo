const { Router } = require("express");

const todo = require("./todo.router");

const urlpatterns = new Map([["/todo", todo]]);

const v1 = Router();
urlpatterns.forEach((router, url) => {
  v1.use(url, router);
});

module.exports = v1;
