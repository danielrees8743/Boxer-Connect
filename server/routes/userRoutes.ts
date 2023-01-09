import { Router } from 'express';
import userController from '../controllers/userController';
import authController from '../controllers/authController';

const router = Router();

router.post('/signup', authController.signup);

router.route('/').get(userController.getAllUsers).post(userController.addUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
