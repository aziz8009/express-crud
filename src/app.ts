import express from 'express';
import bodyParser from 'body-parser';
import connectToDatabase from './config/database';
import router from './routes/router';

const app = express()

app.use(bodyParser.json());

// Connect to MongoDB
connectToDatabase();

app.use('/', router);


module.exports = app;