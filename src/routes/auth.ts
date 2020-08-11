import express from 'express';
import AuthController from '../controllers/AuthController';

const routes = express.Router();

const authController = new AuthController();

routes.post('/login', authController.register);
routes.post('/register', authController.register);

export default routes;
