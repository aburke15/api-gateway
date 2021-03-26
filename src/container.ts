import AuthController from './controllers/authController';
import HealthContoller from './controllers/healthController';
import AuthService from './services/authService';
import UserService from './services/userService';
import ValidationService from './services/validationService';

const awilix = require('awilix');
const { createContainer, asClass } = awilix;

const services = { UserService, AuthService, ValidationService };
const container = createContainer(awilix.InjectionMode.PROXY);

container.register({
    authService: asClass(AuthService),
    userService: asClass(UserService),
    validationService: asClass(ValidationService),
    healthController: asClass(HealthContoller),
    authController: asClass(AuthController).inject(() => services)
});

export = container;
