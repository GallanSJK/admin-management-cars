/**
 * @file contains entry point of controllers api module
 */

const main = require("./main");
const v1 = require("./v1");
const upload = require("./upload");

module.exports = {
  main,
  v1,
  upload,
};
