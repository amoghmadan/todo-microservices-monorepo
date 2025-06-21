const { Router } = require("express");

const v1 = require("./v1");

const urlpatterns = new Map([["/v1", v1]]);

const api = Router();
urlpatterns.forEach((router, url) => {
    api.use(url, router);
});

module.exports = api;
