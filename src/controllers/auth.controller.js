import { log } from 'console';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { db, clientAuth } from '../config/firebase.js'; // Using the Firebase Client Auth

import admin from 'firebase-admin'; // Admin SDK to manage users in Firestore


export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        log('signup');
        // Use the clientAuth (Firebase Auth SDK) to create user
        const userCredential = await createUserWithEmailAndPassword(
            clientAuth, // client-side Firebase auth
            email,
            password
        );
        const user = userCredential.user;

        // Storing additional user data in Firestore (using Admin SDK)
        await db.collection('users').doc(user.uid).set({
            email,
            name,
        });

        // Get Firebase ID token for session management
        const idToken = await user.getIdToken();

        // Set cookie for authentication
        res.cookie('authToken', idToken, {
            httpOnly: true, // Ensure the cookie cannot be accessed by JavaScript
            secure: process.env.NODE_ENV === 'production', // Set secure cookie in production
            maxAge: 24 * 60 * 60 * 1000, // Expire after 1 day
            sameSite: 'strict', // Prevent cross-site request forgery
        });

        return res.status(201).json({
            message: 'User registered successfully',
            idToken,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Use the clientAuth (Firebase Auth SDK) to sign in the user
        const userCredential = await signInWithEmailAndPassword(
            clientAuth, // client-side Firebase auth
            email,
            password
        );
        const user = userCredential.user;

        // Get Firebase ID token for session management
        const idToken = await user.getIdToken();

        // Set cookie for authentication
        res.cookie('authToken', idToken, {
            httpOnly: true, // Ensure the cookie cannot be accessed by JavaScript
            secure: process.env.NODE_ENV === 'production', // Set secure cookie in production
            maxAge: 24 * 60 * 60 * 1000, // Expire after 1 day
            sameSite: 'strict', // Prevent cross-site request forgery
        });

        return res.status(200).json({
            message: 'Login successful',
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const logout = (req, res) => {
    res.clearCookie('authToken', {
        httpOnly: true,
        sameSite: 'strict',
    });
    return res
        .status(200)
        .json({ message: 'Logged out successfully' });
};
