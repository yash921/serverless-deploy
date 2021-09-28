const express = require("express");
const app = express.Router();

const Controller = require("./controllers");

app.post("/signup", Controller.signUp);
app.post("/login", Controller.login);
// app.post("/login", login, HandleErrors(Controller.login));


module.exports = app;