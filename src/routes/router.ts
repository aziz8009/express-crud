// userRoutes.ts
import express from 'express';
import { UserController } from '../modules/users/controllers/UserController';
import { UserService } from '../modules/users/services/UserService';
import { UserRepository } from '../modules/users/repositories/UserRepository';// Import your UserService
import { EmailsController } from '../modules/emails/controllers/emailsController';

const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const emailsController = new EmailsController();

router.get('/users', userController.getAllUsers.bind(userController));
router.get('/users/:id', userController.getUserById.bind(userController));
router.post('/users', userController.createUser.bind(userController));
router.put('/users/:id', userController.updateUser.bind(userController));
router.delete('/users/:id', userController.deleteUser.bind(userController));


router.post('/send-email', emailsController.sendEmail.bind(EmailsController));

export default router;
