const { Server } = require("http");

const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");

function getRequestListener() {
    const application = express();
    application.use(express.urlencoded({extended: true}));
    application.use(express.json());
    application.use(helmet());
    application.use(morgan("combined"));

    return application;
}

async function main() {
    const serverOptions = {};
    const requestLisener = getRequestListener();
    const server = new Server(serverOptions, requestLisener);
    await mongoose.connect("mongodb://127.0.0.1:27017/todo");
    server.listen(process.env.PORT | 3000, process.env.HOST | "::",  () => {
        console.info(server.address());
    });
}

main();
