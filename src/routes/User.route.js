
import express,{Router} from 'express'
import { createUser, getAllUsers, loginUser, logoutUser } from '../controllers/User.controller.js';

const router=Router()

router.route('/create-user').post(createUser);
router.route('/').get(getAllUsers);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

export default router;

