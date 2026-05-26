import bcrypt from "bcryptjs";
import prisma from '../../db/prisma';
import { returnTokens } from './auth-service.js';

export async function handleEmailPasswordRegister(userData) {
    const user = await prisma.user.findUnique({
        where: {
            email: userData.email
        }
    });

    if (user) {
        throw new Error("User with this Email Already Exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userData.password, salt);

    const newUser = await prisma.user.create({
        data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: hashPassword
        }
    });

    if (!newUser) {
        throw new Error("Error on Creating New User");
    }

    return newUser;
}

export async function handleEmailPasswordLogin(userData) {
    const { email, password } = userData;

    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (!user) {
        throw new Error("User does not exist");
    }

    const compareresult = await bcrypt.compare(password, user.password);

    if (!compareresult) {
        throw new Error("Password is not correct");
    }

    const tokenPayload = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    };

    const { accessToken, refreshToken } = await returnTokens(tokenPayload);

    // Save the refreshToken into user Table 

    await prisma.user.update({
        where: {
            email: userData.email
        },

        data: {
            token: refreshToken
        }
    });

    return {
        user: tokenPayload,
        accessToken,
        refreshToken
    };
}