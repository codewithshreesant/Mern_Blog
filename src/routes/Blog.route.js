
import express,{Router} from 'express'
import { createPost, deleteBlog, getAllPosts, getSinglePost, relatedBlog, updateBlog } from '../controllers/Blog.controller.js';

const router=Router()

router.route('/create-blog').post(createPost);
router.route('/').get(getAllPosts);
router.route('/:postId').get(getSinglePost);
router.route('/:id').patch(updateBlog);
router.route('/:id').delete(deleteBlog);
router.route('/related/:id').get(relatedBlog) 

export default router;
