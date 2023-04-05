const express = require("express");
const morgan = require("morgan");
const router = require("../routes");

const app = express();

/** Install request logger */
app.use(morgan("dev"));

/** Install JSON request parser */
app.use(express.json());

/** Install Form Data request parser */
app.use(express.urlencoded({ extended: true }));

/** Install Router */
app.use(router);

module.exports = app;
