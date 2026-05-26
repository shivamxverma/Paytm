import jwt from 'jsonwebtoken';
import prisma from '../db/prisma.js';

export const verifyJWT = async(req , res, next) => {
    try {
        const token = req.headers.authorization?.startsWith('Bearer') 
                ? req.headers.authorization.split(' ')[1]
                : req.cookies?.accessToken
        
        if(!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized Request: No token provided'
            });
        }

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decodedToken.id }
        });

        if(!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid Access Token'
            })
        }

        req.user = user;
        next();
    } catch(error) {
        const statusCode = error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError' ? 401 : 500;
        const message = error.name === 'JsonWebTokenError' ? 'Invalid Token' : (error.name === 'TokenExpiredError' ? 'Token Expired' : 'Internal Server Error');
        console.error('JWT Verification Error:', error.message || error);

        return res.status(statusCode).json({
            status: 'error',
            message
        });
    }
}