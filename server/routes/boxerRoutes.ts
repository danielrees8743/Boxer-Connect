import { Router } from 'express';
import boxerController from '../controllers/boxerController';
import authController from '../controllers/authController';

const router = Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('Head-Coach', 'Assistant-Coach'),
    boxerController.getAllBoxers
  )
  .post(
    authController.protect,
    authController.restrictTo('Head-coach'),
    boxerController.addBoxer
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('Head-Coach', 'Assistant-Coach'),
    boxerController.getBoxer
  )
  .patch(
    authController.protect,
    authController.restrictTo('Head-Coach', 'Assistant-Coach'),
    boxerController.updateBoxer
  )
  .delete(
    authController.protect,
    authController.restrictTo('Head-Coach'),
    boxerController.deleteBoxer
  );

export default router;
