import AuthController from './controllers/authController';
import HealthContoller from './controllers/healthController';
import { AuthService } from './services/authService';
import UserService from './services/userService';
import ValidationService from './services/validationService';
import User from './models/User';
import RefreshToken from './models/RefreshToken';
import { TokenRepository } from './repositories/TokenRepository';
import { PostController } from './controllers/postController';

const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const awilix = require('awilix');
const { createContainer, asClass, asValue, asFunction } = awilix;

const authServiceDependencies = { bcrypt, jwt };
const authControllerDependencies = { UserService, AuthService, ValidationService, User, RefreshToken, TokenRepository };
const container = createContainer(awilix.InjectionMode.PROXY);

container.register({
    authService: asClass(AuthService).inject(() => authServiceDependencies),
    userService: asClass(UserService).inject(() => User),
    validationService: asClass(ValidationService).inject(() => Joi),
    healthController: asClass(HealthContoller),
    authController: asClass(AuthController).inject(() => authControllerDependencies),
    postController: asClass(PostController).inject(() => jwt),
    Joi: asValue(Joi),
    bcrypt: asValue(bcrypt),
    jwt: asValue(jwt),
    User: asValue(User),
    RefreshToken: asValue(RefreshToken),
    tokenRepository: asClass(TokenRepository).inject(() => RefreshToken)
});

export = container;
