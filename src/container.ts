import { AuthController } from './controllers/authController';
import { HealthController } from './controllers/healthController';
import { PostController } from './controllers/postController';
import { AuthService } from './services/authService';
import { UserService } from './services/userService';
import { ValidationService } from './services/validationService';
import { TokenRepository } from './repositories/TokenRepository';
import { Logger } from './config/logger';
import User from './models/User';
import RefreshToken from './models/RefreshToken';
import Log from './models/Log';

const awilix = require('awilix');
const { createContainer, asClass, asValue } = awilix;
const container = createContainer(awilix.InjectionMode.PROXY);

let Joi = require('@hapi/joi');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

let authControllerDependencies = {
    UserService,
    AuthService,
    ValidationService,
    User,
    RefreshToken,
    TokenRepository
};

container.register({
    authService: asClass(AuthService).inject(() => ({ bcrypt, jwt })),
    userService: asClass(UserService).inject(() => User),
    validationService: asClass(ValidationService).inject(() => Joi),
    healthController: asClass(HealthController),
    authController: asClass(AuthController).inject(() => authControllerDependencies),
    postController: asClass(PostController).inject(() => AuthService),
    tokenRepository: asClass(TokenRepository).inject(() => ({ RefreshToken, Logger })),
    logger: asClass(Logger).inject(() => Log),
    Joi: asValue(Joi),
    bcrypt: asValue(bcrypt),
    jwt: asValue(jwt),
    User: asValue(User),
    RefreshToken: asValue(RefreshToken),
    Log: asValue(Log)
});

export = container;
