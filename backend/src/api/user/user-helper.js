import prisma from "../../db/prisma"

export const handleGetUser = async(userId) => {
    const user = await prisma.user.findUnique({
        where: {
            id : userId
        }
    })
    return user;
}

export const handleGetAllUser = async() => {
    const users = await prisma.user.findMany();
    return users;
}

export const handleSearchUsers = async (query, limit = 10) => {
    if (!query || query.trim() === '') {
        return [];
    }
    
    const searchKeyword = query.trim();
    
    const users = await prisma.user.findMany({
        where: {
            OR: [
                {
                    firstName: {
                        contains: searchKeyword,
                        mode: 'insensitive'
                    }
                },
                {
                    lastName: {
                        contains: searchKeyword,
                        mode: 'insensitive'
                    }
                },
                {
                    email: {
                        contains: searchKeyword,
                        mode: 'insensitive'
                    }
                }
            ]
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
        },
        take: limit
    });
    
    return users;
}




