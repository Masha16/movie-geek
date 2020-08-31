"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema,
    model = mongoose.model;
var userSchema = new Schema({
  username: username
}, {});
module.exports = model("User", userSchema);