import http from 'http';
import express from 'express';
import logger from './config/logger';
import config from './config/config';
import healthRoutes from './routes/health';
import authRoutes from './routes/auth';

const NAMESPACE = 'Server';
const router = express();

router.use((req, res, next) => {
    logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

router.use('/api/health', healthRoutes);
router.use('/api/auth', authRoutes);

router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logger.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
