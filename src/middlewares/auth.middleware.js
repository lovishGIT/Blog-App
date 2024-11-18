import { log } from 'console';
import { getAuth } from 'firebase-admin/auth';

export const verifyToken = async (req, res, next) => {
    // log('verifyToken', req?.headers?.cookie?.toString()?.split('=')[1]);
    const token =
        req?.cookies?.authToken ||
        req?.headers?.cookie?.toString()?.split('=')[1];

    if (!token) {
        return res
            .status(401)
            .json({ error: 'Unauthorized: No token provided' });
    }

    try {
        const decodedToken = await getAuth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({
            error: 'Unauthorized: Invalid token',
        });
    }
};
