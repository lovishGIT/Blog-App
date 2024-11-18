import express from 'express';
import {
    getAllBlogs,
    getBlogById,
    createBlog,
    deleteBlog,
    updateBlog,
    filterBlogs,
} from '../controllers/blog.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/filter', filterBlogs);
router.get('/:id', getBlogById);
router.post('/', verifyToken, createBlog);
router.put('/:id', verifyToken, updateBlog);
router.delete('/:id', verifyToken, deleteBlog);

export default router;
