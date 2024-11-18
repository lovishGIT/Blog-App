import jwt from 'jsonwebtoken';

export const secret = process.env.JWT_SECRET || Math.random().toString();

const generateToken = (userId) => {
    return jwt.sign({
        userId,
    }, secret, {
        expiresIn: '1d',
    });
};

export default generateToken;