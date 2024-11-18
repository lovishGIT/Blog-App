import { db } from '../config/firebase.js';
import { blogCollection } from '../models/blog.model.js';

export const getAllBlogs = async (req, res) => {
    try {
        const snapshot = await db.collection(blogCollection).get();
        const blogs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return res.status(200).json(blogs);
    } catch (error) {
        return res.status(500).json({
            error: 'Failed to fetch blogs',
            details: error.message,
        });
    }
};

export const getBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        const doc = await db.collection(blogCollection).doc(id).get();
        if (!doc.exists) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        return res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        return res.status(500).json({
            error: 'Failed to fetch blog',
            details: error.message,
        });
    }
};

export const createBlog = async (req, res) => {
    const { title, content } = req.body;
    const { uid } = req.user;

    try {
        const docRef = await db.collection(blogCollection).add({
            title,
            content,
            author: uid,
            createdAt: new Date().toISOString(),
        });
        return res.status(201).json({
            message: 'Blog created successfully',
            id: docRef.id,
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Failed to create blog',
            details: error.message,
        });
    }
};

export const deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const docRef = db.collection(blogCollection).doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        await docRef.delete();
        return res.status(200).json({
            message: 'Blog deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Failed to delete blog',
            details: error.message,
        });
    }
};

export const updateBlog = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const docRef = db.collection(blogCollection).doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        await docRef.update(updates);
        return res.status(200).json({
            message: 'Blog updated successfully',
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Failed to update blog',
            details: error.message,
        });
    }
};

export const filterBlogs = async (req, res) => {
    const { title, author } = req.query;

    try {
        let query = db.collection(blogCollection);
        if (title) query = query.where('title', '==', title);
        if (author) query = query.where('author', '==', author);

        const snapshot = await query.get();
        const blogs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return res.status(200).json(blogs);
    } catch (error) {
        return res.status(500).json({
            error: 'Failed to filter blogs',
            details: error.message,
        });
    }
};
