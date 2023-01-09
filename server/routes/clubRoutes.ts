import { Router } from 'express';
import clubController from '../controllers/clubController';

const router = Router();

router.route('/').get(clubController.getAllClubs).post(clubController.addClub);

router
  .route('/:id')
  .get(clubController.getClub)
  .patch(clubController.updateClub)
  .delete(clubController.deleteClub);

export default router;
