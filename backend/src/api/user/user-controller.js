import { handleGetUser, handleGetAllUser, handleSearchUsers } from './user-helper.js';

export const getMe = async(req, res) => {
    try {
        const userId = req.user.id;
        const response = await handleGetUser(userId);

        return res.status(200).json({
            message: "User is Fetched Successfully",
            success: true,
            data: response
        })
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to Fetch Me"
        });
    }
}

export const getUser = async(req, res) => {
    try {
        const { userId } = req.params;
        const response = await handleGetUser(userId);

        return res.status(200).json({
            message: "User is Fetched Successfully",
            success: true,
            data: response
        })
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to Fetch User"
        });
    } 
}

export const getAllUser = async(req , res) => {
    try {
        const response = await handleGetAllUser();

        return res.status(200).json({
            message: "Users are Fetched Successfully",
            success: true,
            data: response
        })
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to Fetch Users"
        });
    } 
}

export const searchUsers = async(req, res) => {
    try {
        const { q, limit } = req.query;
        
        // Parse limit to ensure it's a valid number if passed
        const parsedLimit = limit ? parseInt(limit, 10) : 10;
        
        const response = await handleSearchUsers(q, parsedLimit);

        return res.status(200).json({
            message: "Users searched successfully",
            success: true,
            data: response
        });
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to search users"
        });
    }
}