import AuthController from './controllers/authController';
import HealthContoller from './controllers/healthController';
import AuthService from './services/authService';
import UserService from './services/userService';
import ValidationService from './services/validationService';
import User from './models/User';

const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const awilix = require('awilix');
const { createContainer, asClass, asValue, asFunction } = awilix;

const authControllerDependencies = { UserService, AuthService, ValidationService, User };
const container = createContainer(awilix.InjectionMode.PROXY);

container.register({
    authService: asClass(AuthService).inject(() => ({ bcrypt, jwt })),
    userService: asClass(UserService).inject(() => User),
    validationService: asClass(ValidationService).inject(() => Joi),
    healthController: asClass(HealthContoller),
    authController: asClass(AuthController).inject(() => authControllerDependencies),
    Joi: asValue(Joi),
    bcrypt: asValue(bcrypt),
    jwt: asValue(jwt),
    User: asValue(User)
});

export = container;
