import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({});

export const cookieOptions = () => {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000
    }
};


const refreshTokenSecret = () => {
    return process.env.REFRESH_TOKEN_SECRET;
}

const accessTokenSecret = () => {
    return process.env.ACCESS_TOKEN_SECRET;
}

export const returnTokens = async (payload) => {
    const accessToken = jwt.sign(payload, accessTokenSecret(), { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, refreshTokenSecret(), { expiresIn: "7d" });

    return {
        accessToken,
        refreshToken
    }
}