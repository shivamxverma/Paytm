import { handleEmailPasswordRegister, handleEmailPasswordLogin } from './auth-helper';

export function EmailPasswordRegister(req , res) {
    const {email, password, role} = req.body;

    if(!email || !password || !role) {
        return res.status(400).json({
            message : "Email and Password is required"
        })
    } 

    const response = handleEmailPasswordRegister(req.body);

    return res.status(201).json({
        message : "Registration successful",
        user : response
    })
}

export async function EmailPasswordLogin(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and Password are required"
        });
    }
    try {
        const { user, accessToken, refreshToken } = await handleEmailPasswordLogin(req.body);
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        };
        // Set secure cookies
        res.cookie('accessToken', accessToken, cookieOptions);
        res.cookie('refreshToken', refreshToken, cookieOptions);
        return res.status(200).json({
            success: true,
            message: "Login is Successful !",
            user
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