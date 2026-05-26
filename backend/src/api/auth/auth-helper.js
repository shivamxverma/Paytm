import db from '../../db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const accessTokenSecret = process.env.ACCESSTOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESHTOKEN_SECRET;

const pool = db;

function returnTokens(userData) {
    const accessToken = jwt.sign(userData,accessTokenSecret, {expiresIn: '15m'});
    const refreshToken = jwt.sign(userData,refreshTokenSecret, {expiresIn: '7d'});
    return {
        accessToken,
        refreshToken
    }
}

export async function handleEmailPasswordRegister(userData) {
    const { email, password, role } = userData;

    const checkUserExistQuery = `
        SELECT * from users where email = $1;
    `;

    const result = await pool.query(checkUserExistQuery, [email]);

    if(result.rows.length > 0) {
        throw new Error("User with this email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordhash = await bcrypt.hash(password, salt);

    const insertQuery = `
        INSERT INTO users (email, password, role)
        VALUES ($1, $2, $3)
        RETURNING id, email , role; 
    `

    const values = [email, passwordhash, role];

    const insertresult = await pool.query(insertQuery,values);


    return insertResult.rows[0];
} 

export async function handleEmailPasswordLogin(userData) {
    const { email, password } = userData;

    const checkUserExistQuery = `
        SELECT * from users where email = $1;
    `;

    const result = await pool.query(checkUserExistQuery, [email]);


    if (result.rows.length === 0) {
        throw new Error("User does not exist");
    }

    const user = result.rows[0];

    const compareresult = await bcrypt.compare(password, user.password);

    if (!compareresult) {
        throw new Error("Password is not correct");
    }

    const tokenPayload = {
        id : user.id,
        email : user.email,
        role : user.role
    }

    const {accessToken, refreshToken} = returnTokens(tokenPayload);

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // true in production
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    };

    return {
        user: tokenPayload,
        accessToken,
        refreshToken
    };
}