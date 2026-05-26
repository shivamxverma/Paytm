import { handleAddMoney } from './payment-helper.js';

export const addMoney = async (req, res) => {
    try {
        const response = await handleAddMoney(req.user.id, req.body);

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