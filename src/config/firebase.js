// Import necessary packages
import admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { getAuth as getClientAuth } from 'firebase/auth';

// Import config files
import firebaseConfig from './firebaseConfig.json' assert { type: 'json' }; // Firebase config for the client-side
import serviceAccount from './serviceAccount.json' assert { type: 'json' }; // Service account for the Admin SDK

// Initialize Firebase Client SDK (for frontend or client-side interaction)
const app = initializeApp(firebaseConfig); // Using firebaseConfig for client-side initialization
const clientAuth = getClientAuth(app); // Firebase Client Auth

// Initialize Firebase Admin SDK (for backend interaction)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount), // Using serviceAccount for admin-side authentication
    databaseURL: 'https://your-project-id.firebaseio.com', // Your Firebase Database URL
});

// Firestore and Auth from Admin SDK
export const db = admin.firestore(); // Admin SDK Firestore
export const adminAuth = admin.auth(); // Admin SDK Authentication

export { clientAuth }; // Exporting clientAuth separately for use on the client-side
