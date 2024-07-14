const express = require("express");
const connectMongo = require('./config/db.js');
const errorHandler = require('./middlewares/errorHandle.js');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, "../.env")});

const app = express();
connectMongo();
app.use(express.json());

app.use('/resources', require('./routes/resourceRoutes.js'))
app.use('/discussion', require('./routes/discussionRoutes.js'))
app.use('/contest', require('./routes/contestRoutes.js'))
app.use('/project', require('./routes/projectRoutes.js'))

app.use(errorHandler);


module.exports = app;