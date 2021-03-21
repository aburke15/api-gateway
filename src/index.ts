import http from 'http';
import express from 'express';
import logger from './config/logger';
import config from './config/config';
import mongoose from 'mongoose';
import mongodb from 'mongodb';
//import jwt from 'jsonwebtoken';
import healthRoutes from './routes/health';
import authRoutes from './routes/auth';

const NAMESPACE = 'Server';
const app = express();

const MongoClient = mongodb.MongoClient;
const uri = `${process.env.DB_URI}`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('connected to db');
    }

    const collection = client.db('test').collection('devices');

    client.close();
});

app.use((req, res, next) => {
    logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () => logger.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
