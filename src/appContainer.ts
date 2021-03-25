import AuthController from './controllers/authController';
import HealthContoller from './controllers/healthController';
import AuthService from './services/authService';
import UserService from './services/userService';
import ValidationService from './services/validationService';

const { createContainer, asClass } = require('awilix');

const container = createContainer();

container.register({
    authService: asClass(AuthService),
    userService: asClass(UserService),
    validationService: asClass(ValidationService)
});

export = container;
