const express = require("express");
const connectMongo = require('./config/db.js');
const errorHandler = require('./middlewares/errorHandle.js');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, "../.env")});
const cookieParser = require("cookie-parser");
const cors = require('./middlewares/cors.js')
const bodyParser = require("body-parser");

const app = express();
connectMongo();
app.use(express.json());
app.use(cookieParser());
app.use(cors);
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.get('/', (req,res) => {
    res.send("Server is running");
})
app.use('/user', require('./routes/userRoutes.js'));
app.use('/admin',require('./routes/adminRoutes.js'));
app.use('/resources', require('./routes/resourcesRoutes.js'))
app.use('/discussion', require('./routes/discussionRoutes.js'))
app.use('/projectCollaboration', require('./routes/projectCollaborationRoutes.js'))
app.use('/project', require('./routes/projectRoutes.js'))
app.use('/contest',require('./routes/contestRoutes.js'));

app.use(errorHandler);


module.exports = app;