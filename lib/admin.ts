import { auth } from "@clerk/nextjs/server";

const adminIds = [
    "user_2txx0L5gD4NWBtUEOblXW3yjg5F",
];

export const getIsAdmin = async () => {
    const { userId } = await auth();

    if(!userId) {
        return false;
    }

    return adminIds.indexOf(userId) !== -1;
};

