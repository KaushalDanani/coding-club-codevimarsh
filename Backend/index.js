const express = require('express')
const connectMongo = require('./config/db.js');
const errorHandler = require('./middlewares/errorHandle.js');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, "../.env")});

const app = express();
connectMongo();
app.use(express.json());

// profile/edit profile also in user
app.use('/user', require('./routes/userRoutes.js'));
app.use('/admin',require('./routes/adminRoutes.js'));
// app.use('/contest', require('./routes/'))
app.use('/resources', require('./routes/resourcesRoutes.js'))
// app.use('/disscusion', require('./routes/'))
// app.use('/projectCollaboration', require('./routes/'))
// app.use('/project', require('./routes/'))

app.use(errorHandler);

module.exports = app;