
import express,{Router} from 'express'
import { createPost, deleteBlog, getAllPosts, getSinglePost, relatedBlog, updateBlog } from '../controllers/Blog.controller.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';

const router=Router()

router.route('/create-blog').post(verifyToken,createPost); 
router.route('/').get(getAllPosts);
router.route('/:postId').get(getSinglePost);
router.route('/:id').patch(verifyToken,updateBlog);
router.route('/:id').delete(verifyToken,deleteBlog);
router.route('/related/:id').get(relatedBlog) 

export default router;
