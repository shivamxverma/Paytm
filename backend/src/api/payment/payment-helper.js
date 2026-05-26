import { Prisma } from '@prisma/client';
import prisma from "../../db/prisma.js";

export const handleAddMoney = async (userId, money) => {
    const account = await prisma.account.findUnique({
        where: {
            userId: userId
        }
    });

    const currentBalance = account ? new Prisma.Decimal(account.balance) : new Prisma.Decimal(0);
    const addedMoney = new Prisma.Decimal(money);
    const newBalance = currentBalance.add(addedMoney);

    const updatedAccount = await prisma.account.upsert({
        where: {
            userId: userId
        },
        update: {
            balance: newBalance
        },
        create: {
            userId: userId,
            balance: newBalance
        }
    });

    return updatedAccount;
};