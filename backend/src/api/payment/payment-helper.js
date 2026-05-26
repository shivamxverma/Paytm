import { Prisma } from '../../../migration/index.js';
import prisma from "../../db/prisma.js";

export const handleAddMoney = async (userId, money) => {
    const addedMoney = new Prisma.Decimal(money);

    const updatedAccount = await prisma.account.upsert({
        where: {
            userId: userId
        },
        update: {
            balance: {
                increment: addedMoney
            }
        },
        create: {
            userId: userId,
            balance: addedMoney
        }
    });

    return updatedAccount;
};

export const handleTransferMoney = async (senderId, receiverId, money) => {
    if (senderId === receiverId) {
        throw new Error("Sender and receiver account cannot be the same");
    }

    const transferAmount = new Prisma.Decimal(money);
    if (transferAmount.lessThanOrEqualTo(0)) {
        throw new Error("Transfer amount must be greater than zero");
    }

    const senderAccount = await prisma.account.findUnique({
        where: {
            userId: senderId
        }
    });

    const receiverAccount = await prisma.account.findUnique({
        where: {
            userId: receiverId
        }
    });

    if (!senderAccount) {
        throw new Error("Sender account not found");
    }

    if (!receiverAccount) {
        throw new Error("Receiver account not found");
    }

    const senderBalance = new Prisma.Decimal(senderAccount.balance);
    if (senderBalance.lessThan(transferAmount)) {
        throw new Error("Insufficient Money");
    }

    const result = await prisma.$transaction([
        prisma.account.update({
            where: {
                userId: senderId,
            },
            data: {
                balance: {
                    decrement: transferAmount,
                },
            },
        }),
        prisma.account.update({
            where: {
                userId: receiverId,
            },
            data: {
                balance: {
                    increment: transferAmount,
                },
            },
        }),
        prisma.transaction.create({
            data: {
                amount: transferAmount,
                type: 'DEBIT',
                status: 'SUCCESS',
                senderId: senderId,
                receiverId: receiverId
            }
        })
    ]);

    return result;
}

export const handleGetTransactions = async (userId, limit = 20, skip = 0) => {
    const transactions = await prisma.transaction.findMany({
        where: {
            OR: [
                { senderId: userId },
                { receiverId: userId }
            ]
        },
        include: {
            sender: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true
                }
            },
            receiver: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: limit,
        skip: skip
    });

    return transactions;
}