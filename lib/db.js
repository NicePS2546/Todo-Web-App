import { PrismaClient } from "@prisma/client";

const prismaConnect =  () =>{
   return new PrismaClient();
};


const globalForPrisma =  {
    prisma: undefined
  };
  

export const prisma = globalForPrisma.prisma ?? prismaConnect();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;