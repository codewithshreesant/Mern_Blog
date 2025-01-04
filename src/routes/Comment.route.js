
import express,{Router} from 'express'
import { createComment, deleteComment, getAllComments } from '../controllers/Comment.controller.js';

const router=Router()

router.route('/create-comment').post(createComment);
router.route('/').get(getAllComments);
router.route('/:id').delete(deleteComment);

export default router;