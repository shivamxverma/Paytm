import { handleEmailPasswordRegister, handleEmailPasswordLogin } from './auth-helper.js';
import { cookieOptions } from './auth-service.js';

export async function EmailPasswordRegister(req , res) {
    try {
        const response = await handleEmailPasswordRegister(req.body);

        return res.status(201).json({
            message : "Registration successful",
            success: true,
            data : response
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export async function EmailPasswordLogin(req, res) {
    try {
        const { user, accessToken, refreshToken } = await handleEmailPasswordLogin(req.body);
        res.cookie('accessToken', accessToken, cookieOptions());
        res.cookie('refreshToken', refreshToken, cookieOptions());
        return res.status(200).json({
            success: true,
            message: "Login is Successful !",
            data: user
        });
    } catch (error) {
        // Handle "User does not exist" or "Incorrect password"
        const statusCode = error.message === "User does not exist" ? 404 : 400;
        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
}