import http from 'http';
import express from 'express';
import config from './config/config';
import mongoose from 'mongoose';
import healthRoutes from './routes/healthRoutes';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';

const NAMESPACE = 'Server';
const app = express();

const container = require('./container');
const logger = container.resolve('logger');

const uri = `${process.env.DB_URI}`;

const mongoose_options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
};

mongoose.connect(uri, mongoose_options);

app.use((req, res, next) => {
    logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

console.log('another new thing');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
});

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).send({
        error: error.message
    });
});

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () => logger.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
