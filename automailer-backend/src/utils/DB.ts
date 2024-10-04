import prisma from "../prisma/index";
export const connectToDB = async () => {
    try {
        await prisma.$connect();
    }catch (err) {
        console.log(err);
        throw new Error("Unable to connect to MONGO DB");
    }
}