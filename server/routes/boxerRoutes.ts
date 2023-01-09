import { Router } from 'express';
import boxerController from '../controllers/boxerController';

const router = Router();

router.route('/').get(boxerController.getAllBoxers).post(boxerController.addBoxer);

router
  .route('/:id')
  .get(boxerController.getBoxer)
  .patch(boxerController.updateBoxer)
  .delete(boxerController.deleteBoxer);

export default router;
