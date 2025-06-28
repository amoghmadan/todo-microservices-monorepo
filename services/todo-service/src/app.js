const { Server } = require("http");

const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");

const routers = require("./routers");
const settings = require("./settings");

function getRequestListener() {
  const application = express();
  application.use(express.urlencoded({ extended: true }));
  application.use(express.json());
  application.use(helmet());
  application.use(morgan("combined"));

  routers.forEach((router, url) => {
    application.use(url, router);
  });

  return application;
}

async function main() {
  const serverOptions = {};
  const requestLisener = getRequestListener();
  const server = new Server(serverOptions, requestLisener);
  await mongoose.connect(settings.MONGODB_URI);
  server.listen(process.env.PORT | 3000, process.env.HOST | "::", () => {
    console.info(server.address());
  });
}

main();
