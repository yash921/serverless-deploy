const express = require('express');
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const cron = require('node-cron');
// const notificationCrons = require("./cron/cron");
// const mySql = require("./Database/connection");

const app = express();
app.use(express.json({extended: true}));
const userAuthRoutes = require("./modules/auth/routes");


app.use("/api/v1/user-auth", userAuthRoutes);


const port = 4004;


app.listen(port, () => console.log(`Listening on port ${port}....`))

// app.timeout = 21000;

module.exports = app;