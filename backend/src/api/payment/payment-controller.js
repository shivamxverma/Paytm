import { handleAddMoney, handleTransferMoney, handleGetTransactions } from './payment-helper.js';

export const addMoney = async (req, res) => {
    try {
        const { money } = req.body;
        const response = await handleAddMoney(req.user.id, money);

        return res.status(200).json({
            message: "Money is Added Successfully !",
            success: true,
            data: response
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to add money"
        });
    }
};

export const transferMoney = async (req, res) => {
    try {
        const { userId } = req.params;
        const { balance } = req.body;
        const response = await handleTransferMoney(req.user.id, userId, balance);

        return res.status(200).json({
            message: "Money is Transferred Successfully !",
            success: true,
            data: response
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to Transfer money"
        });
    }
}

export const getTransactions = async (req, res) => {
    try {
        const userId = req.user.id;
        const { limit, skip } = req.query;

        const parsedLimit = limit ? parseInt(limit, 10) : 20;
        const parsedSkip = skip ? parseInt(skip, 10) : 0;

        const response = await handleGetTransactions(userId, parsedLimit, parsedSkip);

        return res.status(200).json({
            message: "Transactions retrieved successfully!",
            success: true,
            data: response
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to retrieve transactions"
        });
    }
}