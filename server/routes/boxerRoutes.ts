import { Router } from 'express';
import boxerController from '../controllers/boxerController';
import authController from '../controllers/authController';

const router = Router();

router
  .route('/')
  .get(authController.protect, boxerController.getAllBoxers)
  .post(boxerController.addBoxer);

router
  .route('/:id')
  .get(boxerController.getBoxer)
  .patch(boxerController.updateBoxer)
  .delete(boxerController.deleteBoxer);

export default router;
