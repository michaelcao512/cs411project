import { Router } from 'express';
import {
  addUser,
  addGenreToUser,
  deleteAllUsers,
  deleteGenreFromUser,
  deleteUser,
  getUsers,
  updateUser,
} from './user.controller';

const router = Router();

router.route('/').get(getUsers);
router.route('/add').post(addUser);
router.route('/:id/update').patch(updateUser);
router.route('/:id/delete').delete(deleteUser);
router.route('/deleteAll').delete(deleteAllUsers);
router.route('/:id/addgenre').patch(addGenreToUser);
router.route('/:id/deletegenre').patch(deleteGenreFromUser);

export default router;
